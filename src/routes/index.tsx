import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { fmtBaht, fmtBahtShort } from "@/lib/utils";
import { Flame, ArrowLeftRight, ChevronDown, Plus, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import avatar from "@/assets/wanjot-avatar.jpg";
import { getDashboardData } from "@/lib/api/finance.functions";
import { useLoaderData } from "@tanstack/react-router";
import { z } from "zod";
import { format, addMonths, subMonths, parseISO } from "date-fns";
import { th } from "date-fns/locale";

const searchSchema = z.object({
  month: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Wanjot – บันทึกรายรับรายจ่าย" },
      { name: "description", content: "มินิแอปบนไลน์ บันทึกเงินเข้า-ออก เห็นภาพรวมไว ทำงานร่วมกับ Google Sheet" },
      { property: "og:title", content: "Wanjot – บันทึกรายรับรายจ่าย" },
      { property: "og:description", content: "บันทึกเงินเข้า-ออก เห็นภาพรวมไว ทำงานร่วมกับ Google Sheet" },
    ],
  }),
  loaderDeps: ({ search: { month } }) => ({ month }),
  loader: async ({ deps: { month } }) => {
    let billingCycleDate = 1;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem('wanjot_billingCycleDate');
      if (stored) billingCycleDate = parseInt(stored, 10);
    }
    return await getDashboardData({ data: { month, billingCycleDate } });
  },
  component: Dashboard,
});

function Dashboard() {
  const { transactions, categorySpending, summary, userProfile } = useLoaderData({ from: "/" });
  const { month } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  
  const [topCatTab, setTopCatTab] = useState<"รายจ่าย" | "รายรับ">("รายจ่าย");
  
  // Re-fetch data when billing cycle changes on client
  const [billingCycle, setBillingCycle] = useState(1);
  useEffect(() => {
    const stored = localStorage.getItem('wanjot_billingCycleDate');
    if (stored && parseInt(stored, 10) !== billingCycle) {
      setBillingCycle(parseInt(stored, 10));
      navigate({ search: (prev) => ({ ...prev }), replace: true });
    }
  }, [billingCycle, navigate]);

  const currentMonthDate = month ? parseISO(`${month}-01`) : new Date();

  const handlePrevMonth = () => {
    const prev = subMonths(currentMonthDate, 1);
    navigate({ search: { month: format(prev, 'yyyy-MM') } });
  };

  const handleNextMonth = () => {
    const next = addMonths(currentMonthDate, 1);
    navigate({ search: { month: format(next, 'yyyy-MM') } });
  };

  const income = summary
    .filter((s) => s.type === "รายรับ")
    .reduce((s, t) => s + (t.total || 0), 0);
  const expense = summary
    .filter((s) => s.type === "รายจ่าย")
    .reduce((s, t) => s + (t.total || 0), 0);
  const balance = income - expense;

  const expenseCats = categorySpending
    .filter((c) => c.type === "รายจ่าย" && (c.spent || 0) > 0)
    .sort((a, b) => (b.spent || 0) - (a.spent || 0));
  
  const incomeCats = categorySpending
    .filter((c) => c.type === "รายรับ" && (c.spent || 0) > 0)
    .sort((a, b) => (b.spent || 0) - (a.spent || 0));

  const totalExp = expenseCats.reduce((s, c) => s + (c.spent || 0), 0);
  const totalInc = incomeCats.reduce((s, c) => s + (c.spent || 0), 0);

  const R = 64;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const palette = [
    "var(--primary)",
    "oklch(0.78 0.18 358)",
    "oklch(0.85 0.10 358)",
    "var(--pink-soft)",
    "oklch(0.72 0.06 280)",
    "oklch(0.85 0.04 250)",
    "var(--cream)",
  ];

  const totalBudget = categorySpending.reduce((s, c) => s + (c.budget || 0), 0);
  const totalSpent = categorySpending.filter(c => c.type === 'รายจ่าย').reduce((s, c) => s + (c.spent || 0), 0);
  const budgetRemaining = totalBudget - totalSpent;

  return (
    <PageShell title="สรุป" backTo="/">
      {/* Profile card */}
      <section className="paper-card flex items-center gap-4 p-4">
        <div className="relative">
          <img 
            src={userProfile?.avatar_url || avatar} 
            alt={userProfile?.display_name || "Wanjot avatar"} 
            className="h-16 w-16 rounded-full object-cover ring-2 ring-pink-soft" 
          />
          <span className="absolute -bottom-1 -right-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground shadow">
            ฟรี
          </span>
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-cocoa">
            {userProfile?.display_name || "Wanjot"}
          </h1>
          <p className="text-xs text-muted-foreground">เด็กช่างฝัน · บันทึกเงินสนุกๆ</p>
        </div>
      </section>

      {/* Summary card */}
      <section className="paper-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-cocoa">สรุป</h2>
          
          {/* Month Selector */}
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-1">
            <button onClick={handlePrevMonth} className="p-1 rounded-lg hover:bg-background text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-cocoa min-w-[80px] text-center">
              {format(currentMonthDate, 'MMM yyyy', { locale: th })}
            </span>
            <button onClick={handleNextMonth} className="p-1 rounded-lg hover:bg-background text-muted-foreground">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Balance pill */}
        <div className="mb-3 rounded-2xl border border-border/70 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">เหลือเก็บ</span>
            <button className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
              รอบงบนี้ <ArrowLeftRight className="h-3 w-3" />
            </button>
          </div>
          <div className={`mt-1 font-display text-4xl font-bold ${balance < 0 ? "text-destructive" : "text-mint-foreground"}`}>
            {fmtBaht(balance)}
          </div>
        </div>

        {/* Income / Expense cards */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border-2 border-primary/40 bg-pink-soft/50 p-3">
            <div className="text-xs text-cocoa/70">รายจ่าย</div>
            <div className="font-display text-2xl font-bold text-primary">{fmtBaht(-expense)}</div>
          </div>
          <div className="rounded-2xl border-2 border-mint/50 bg-mint-soft/60 p-3">
            <div className="text-xs text-cocoa/70">รายรับ</div>
            <div className="font-display text-2xl font-bold text-mint-foreground">{fmtBaht(income)}</div>
          </div>
        </div>

        {/* Donut + stats */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
            <circle cx="80" cy="80" r={R} fill="none" stroke="var(--muted)" strokeWidth="18" />
            {expenseCats.map((c, i) => {
              const pct = (c.spent || 0) / (totalExp || 1);
              const dash = pct * C;
              const el = (
                <circle
                  key={c.category || i}
                  cx="80"
                  cy="80"
                  r={R}
                  fill="none"
                  stroke={palette[i % palette.length]}
                  strokeWidth="18"
                  strokeDasharray={`${dash} ${C - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
              offset += dash;
              return el;
            })}
          </svg>

          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                จดติดต่อมา <Flame className="h-4 w-4 text-primary" />
              </span>
              <span className="font-semibold text-cocoa">1 วัน</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">จำนวนรายการ</span>
              <span className="font-semibold text-cocoa">{transactions.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">งบที่ตั้งไว้</span>
              <span className="font-semibold text-cocoa">
                {fmtBahtShort(totalBudget)}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">งบคงเหลือ</span>
              <span className="font-semibold text-primary">
                {fmtBahtShort(budgetRemaining)}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">รอบงบ</span>
              <span className="font-semibold text-cocoa">วันที่ {billingCycle}</span>
            </li>
          </ul>
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-1 rounded-2xl border border-border bg-background py-3 text-sm text-cocoa">
          ดูเพิ่ม <ChevronDown className="h-4 w-4" />
        </button>
      </section>

      {/* Top categories preview */}
      <section className="paper-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-cocoa">หมวดที่ใช้มากสุด</h3>
          <div className="flex gap-1 rounded-full bg-muted p-1">
            <button
              onClick={() => setTopCatTab("รายจ่าย")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                topCatTab === "รายจ่าย" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              รายจ่าย
            </button>
            <button
              onClick={() => setTopCatTab("รายรับ")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                topCatTab === "รายรับ" ? "bg-mint text-mint-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              รายรับ
            </button>
          </div>
        </div>
        <ul className="space-y-3">
          {(topCatTab === "รายจ่าย" ? expenseCats : incomeCats).slice(0, 4).map((c, i) => {
            const currentTotal = topCatTab === "รายจ่าย" ? totalExp : totalInc;
            const pct = currentTotal ? ((c.spent || 0) / currentTotal) * 100 : 0;
            const ofBudget = c.budget ? Math.min(((c.spent || 0) / c.budget) * 100, 100) : null;
            return (
              <li key={c.category || i}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-cocoa">
                    <span className="text-lg">{c.icon || '📦'}</span>
                    <span className="font-medium">{c.category}</span>
                  </span>
                  <span className={`font-semibold ${topCatTab === "รายจ่าย" ? "text-primary" : "text-mint-foreground"}`}>
                    {fmtBahtShort(topCatTab === "รายจ่าย" ? -(c.spent || 0) : (c.spent || 0))}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${ofBudget ?? pct}%`,
                      background: topCatTab === "รายจ่าย" ? palette[i % palette.length] : "var(--mint)",
                    }}
                  />
                </div>
              </li>
            );
          })}
          {(topCatTab === "รายจ่าย" ? expenseCats : incomeCats).length === 0 && (
            <li className="py-4 text-center text-sm text-muted-foreground">ไม่มีข้อมูลในหมวดนี้</li>
          )}
        </ul>
        <Link to="/categories" className="mt-4 block text-center text-xs font-medium text-primary">
          ดูทั้งหมด →
        </Link>
      </section>

      {/* Floating add button */}
      <Link
        to="/add"
        aria-label="เพิ่มรายการ"
        className="fixed bottom-24 right-5 z-30 rounded-full bg-primary p-4 text-primary-foreground shadow-pop transition-transform active:scale-95"
      >
        <Plus className="h-6 w-6" strokeWidth={2.6} />
      </Link>
    </PageShell>
  );
}
