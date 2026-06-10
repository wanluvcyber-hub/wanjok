import { eventHandler, readRawBody, createError } from "h3";
import crypto from "crypto";
import { supabaseAdmin } from "../../lib/supabase-admin";

// LINE Config (ควรใส่ใน .env)
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || "";
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";

// ฟังก์ชันดึงโปรไฟล์จาก LINE
async function getLineProfile(lineUserId: string) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) return null;
  try {
    const res = await fetch(`https://api.line.me/v2/bot/profile/${lineUserId}`, {
      headers: {
        "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
    });
    if (!res.ok) return null;
    return await res.json() as { displayName: string; pictureUrl: string };
  } catch (error) {
    console.error("Error fetching LINE profile:", error);
    return null;
  }
}

// ฟังก์ชันตรวจสอบ Signature จาก LINE
function verifySignature(body: string, signature: string) {
  const hash = crypto
    .createHmac("sha256", LINE_CHANNEL_SECRET)
    .update(body)
    .digest("base64");
  return hash === signature;
}

export default eventHandler(async (event) => {
  const method = event.method;
  if (method !== "POST") {
    return { status: "ok" };
  }

  const signature = event.headers.get("x-line-signature") || "";
  const rawBody = await readRawBody(event, "utf8") || "";

  // 1. ตรวจสอบว่ามาจาก LINE จริงหรือไม่
  if (!verifySignature(rawBody, signature)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid signature",
    });
  }

  const { events } = JSON.parse(rawBody);

  for (const lineEvent of events) {
    if (lineEvent.type === "message" && lineEvent.message.type === "text") {
      const lineUserId = lineEvent.source.userId;
      const text = lineEvent.message.text;

      try {
        // 2. จัดการเรื่อง User (หาหรือสร้างใหม่)
        let { data: user, error: userError } = await supabaseAdmin
          .from("users")
          .select("id, display_name, avatar_url")
          .eq("line_user_id", lineUserId)
          .maybeSingle();

        const profile = await getLineProfile(lineUserId);

        if (!user) {
          const { data: newUser, error: createError } = await supabaseAdmin
            .from("users")
            .insert({ 
              line_user_id: lineUserId,
              display_name: profile?.displayName || "User",
              avatar_url: profile?.pictureUrl || null
            })
            .select("id")
            .single();
          
          if (createError) throw createError;
          user = newUser;
        } else {
          // อัปเดตโปรไฟล์ถ้ามีการเปลี่ยนแปลง
          if (profile && (user.display_name !== profile.displayName || user.avatar_url !== profile.pictureUrl)) {
            await supabaseAdmin
              .from("users")
              .update({
                display_name: profile.displayName,
                avatar_url: profile.pictureUrl
              })
              .eq("id", user.id);
          }
        }

        if (!user) throw new Error("User not found or created");

        // 3. วิเคราะห์ข้อความแบบง่าย (เช่น "ข้าว 50")
        const match = text.match(/^(.+)\s+(\d+)$/);
        if (match) {
          const [_, note, amountStr] = match;
          const amount = parseFloat(amountStr);

          // บันทึกธุรกรรม
          const { error: txError } = await supabaseAdmin
            .from("transactions")
            .insert({
              user_id: user.id,
              amount: amount,
              type: "รายจ่าย", // ค่าเริ่มต้น
              note: note,
              transacted_at: new Date().toISOString()
            });

          if (txError) throw txError;

          // 4. ตอบกลับผู้ใช้ (ใช้ LINE Messaging API)
          await replyToLine(lineEvent.replyToken, `บันทึกเรียบร้อย: ${note} ${amount} บาท`);
        } else {
          await replyToLine(lineEvent.replyToken, `ฉันไม่เข้าใจข้อความนี้ ลองพิมพ์ "ชื่อรายการ ยอดเงิน" เช่น "กะเพรา 50"`);
        }
      } catch (err) {
        console.error("Webhook Error:", err);
      }
    }
  }

  return { status: "success" };
});

async function replyToLine(replyToken: string, message: string) {
  if (!LINE_CHANNEL_ACCESS_TOKEN) return;

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [{ type: "text", text: message }],
    }),
  });
}
