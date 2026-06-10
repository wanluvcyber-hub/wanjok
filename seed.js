
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read .env manually to avoid dependency on dotenv for this quick script
const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log("Starting seeding...");

  // 1. Ensure User exists
  let userId = "00000000-0000-0000-0000-000000000000";
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (userError && userError.code === "PGRST116") {
    console.log("Creating default user...");
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({
        id: userId,
        line_user_id: "default_user",
        display_name: "Default User"
      })
      .select()
      .single();
    if (createError) {
      console.error("Error creating user:", createError);
      // If we can't create user, maybe RLS is on and we need a real ID or just try to insert transaction anyway
    } else {
      userId = newUser.id;
    }
  } else if (user) {
    userId = user.id;
  }

  // 2. Ensure Categories exist
  const defaultCategories = [
    { name: "อาหารและเครื่องดื่ม", icon: "🍱", type: "รายจ่าย", is_default: true },
    { name: "การเดินทาง", icon: "🚗", type: "รายจ่าย", is_default: true },
    { name: "ช้อปปิ้ง", icon: "🛍️", type: "รายจ่าย", is_default: true },
    { name: "ที่อยู่อาศัย", icon: "🏠", type: "รายจ่าย", is_default: true },
    { name: "เงินเดือน", icon: "💰", type: "รายรับ", is_default: true },
    { name: "โบนัส", icon: "🎁", type: "รายรับ", is_default: true },
    { name: "อื่นๆ", icon: "✨", type: "รายจ่าย", is_default: true },
  ];

  console.log("Checking categories...");
  const { data: existingCats } = await supabase.from("categories").select("*");
  
  if (!existingCats || existingCats.length === 0) {
    console.log("Adding default categories...");
    const { error: catInsertError } = await supabase.from("categories").insert(defaultCategories);
    if (catInsertError) console.error("Error inserting categories:", catInsertError);
  }

  // Fetch categories again to get IDs
  const { data: categories } = await supabase.from("categories").select("*");
  const getCatId = (name) => categories.find(c => c.name === name)?.id;

  // 3. Add Sample Transactions
  const transactions = [
    {
      user_id: userId,
      amount: 150,
      type: "รายจ่าย",
      category_id: getCatId("อาหารและเครื่องดื่ม"),
      note: "ข้าวกะเพราไข่ดาว",
      transacted_at: new Date().toISOString(),
    },
    {
      user_id: userId,
      amount: 45,
      type: "รายจ่าย",
      category_id: getCatId("อาหารและเครื่องดื่ม"),
      note: "กาแฟอเมซอน",
      transacted_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      user_id: userId,
      amount: 25000,
      type: "รายรับ",
      category_id: getCatId("เงินเดือน"),
      note: "เงินเดือนเดือนนี้",
      transacted_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      user_id: userId,
      amount: 500,
      type: "รายจ่าย",
      category_id: getCatId("ช้อปปิ้ง"),
      note: "ซื้อเสื้อใหม่",
      transacted_at: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      user_id: userId,
      amount: 60,
      type: "รายจ่าย",
      category_id: getCatId("การเดินทาง"),
      note: "ค่า MRT",
      transacted_at: new Date(Date.now() - 43200000).toISOString(),
    }
  ];

  console.log("Adding transactions...");
  const { error: transError } = await supabase.from("transactions").insert(transactions);
  
  if (transError) {
    console.error("Error inserting transactions:", transError);
  } else {
    console.log("Successfully added sample data!");
  }
}

seed();
