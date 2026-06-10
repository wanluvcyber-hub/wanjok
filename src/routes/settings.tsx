import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FileSpreadsheet, Bell, Palette, Info, ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "ตั้งค่า – Wanjot" }, { name: "description", content: "ตั้งค่าและเชื่อม Google Sheet" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <PageShell title="ตั้งค่า">
      <h1 className="px-1 pt-2 text-center font-display text-3xl font-bold text-cocoa">ตั้งค่า</h1>

      <section className="paper-card divide-y divide-border/70">
        <button className="flex w-full items-center gap-3 p-4 text-left">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cream"><FileSpreadsheet className="h-5 w-5 text-primary" /></div>
          <div className="flex-1">
            <div className="font-semibold text-cocoa">เชื่อม Google Sheet</div>
            <div className="text-xs text-muted-foreground">ดึงข้อมูลจากชีตของคุณ</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <button className="flex w-full items-center gap-3 p-4 text-left">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cream"><Bell className="h-5 w-5 text-primary" /></div>
          <div className="flex-1">
            <div className="font-semibold text-cocoa">การแจ้งเตือน</div>
            <div className="text-xs text-muted-foreground">เตือนเมื่อใกล้เกินงบ</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex w-full items-center gap-3 p-4 text-left"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cream">
            {theme === 'dark' ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-cocoa">ธีมและสี</div>
            <div className="text-xs text-muted-foreground">
              {theme === 'dark' ? 'โหมดกลางคืน (คลิกเพื่อเปลี่ยน)' : 'โหมดกลางวัน (คลิกเพื่อเปลี่ยน)'}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <button className="flex w-full items-center gap-3 p-4 text-left">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cream"><Info className="h-5 w-5 text-primary" /></div>
          <div className="flex-1">
            <div className="font-semibold text-cocoa">เกี่ยวกับ Wanjot</div>
            <div className="text-xs text-muted-foreground">เวอร์ชัน 0.1.0</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </section>

      <p className="pt-2 text-center text-xs text-muted-foreground">
        ทำด้วย ❤️ สำหรับ LINE Mini App · มินิแอป Wanjot
      </p>
    </PageShell>
  );
}
