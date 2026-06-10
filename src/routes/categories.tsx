import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { fmtBahtShort } from "@/lib/utils";
import { Calendar, Pencil, ListFilter, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getCategoriesData, updateBudgetFn } from "@/lib/api/finance.functions";
import { useLoaderData, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { format, addMonths, subMonths, parseISO } from "date-fns";
import { th } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

const searchSchema = z.object({
  month: z.string().optional(),
});

export const Route = createFileRoute("/categories")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "หมวด / งบ – Wanjot" },
      { name: "description", content: "จัดการหมวดหมู่รายรับรายจ่ายและตั้งงบประมาณรายเดือน" },
      { property: "og:title", content: "หมวด / งบ – Wanjot" },
      { property: "og:description", content: "จัดการหมวดและงบประมาณ" },
    ],
  }),
  loaderDeps: ({ search: { month } }) => ({ month }),
  loader: async ({ deps: { month } }) => {
    let billingCycleDate = 1;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem('wanjot_billingCycleDate');
      if (stored) billingCycleDate = parseInt(stored, 10);
    }
    return await getCategoriesData({ data: { month, billingCycleDate } });
  },
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories, categorySpending } = useLoaderData({ from: "/categories" });
  const { month } = Route.useSearch();
  const navigate = useNavigate({ from: "/categories" });
  const router = useRouter();

  const [tab, setTab] = useState<"รายจ่าย" | "รายรับ">("รายจ่าย");
  
  const [billingCycle, setBillingCycle] = useState(1);
  const [isCycleDialogOpen, setIsCycleDialogOpen] = useState(false);
  const [cycleInput, setCycleInput] = useState("1");

  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [budgetInput, setBudgetInput] = useState("");
  const [isSavingBudget, setIsSavingBudget] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wanjot_billingCycleDate');
    if (stored) {
      setBillingCycle(parseInt(stored, 10));
      setCycleInput(stored);
    }
  }, []);

  const handleSaveCycle = () => {
    let val = parseInt(cycleInput, 10);
    if (isNaN(val) || val < 1 || val > 28) val = 1;
    setBillingCycle(val);
    localStorage.setItem('wanjot_billingCycleDate', val.toString());
    setIsCycleDialogOpen(false);
    navigate({ search: (prev) => ({ ...prev }), replace: true });
  };

  const handleSaveBudget = async () => {
    if (!selectedCat) return;
    setIsSavingBudget(true);
    try {
      const amount = parseFloat(budgetInput) || 0;
      await updateBudgetFn({
        data: {
          user_id: "a1b2c3d4-0000-0000-0000-000000000001",
          category_id: selectedCat.category_id || selectedCat.id, // Fallback for pure category object vs spending view
          amount: amount
        }
      });
      setIsBudgetDialogOpen(false);
      router.invalidate();
    } catch (err) {
      console.error("Failed to save budget", err);
    } finally {
      setIsSavingBudget(false);
    }
  };

  const openBudgetDialog = (c: any, spending: any) => {
    setSelectedCat(spending || c);
    setBudgetInput(spending?.budget ? spending.budget.toString() : "");
    setIsBudgetDialogOpen(true);
  };

  const currentMonthDate = month ? parseISO(`${month}-01`) : new Date();

  const handlePrevMonth = () => {
    const prev = subMonths(currentMonthDate, 1);
    navigate({ search: { month: format(prev, 'yyyy-MM') } });
  };

  const handleNextMonth = () => {
    const next = addMonths(currentMonthDate, 1);
    navigate({ search: { month: format(next, 'yyyy-MM') } });
  };
  
  const list = categories.filter((c) => c.type === tab);

  return (
    <PageShell title="จัดการหมวดและงบ">
      <div className="flex items-center justify-between px-1 pt-2">
        <h1 className="font-display text-3xl font-bold text-cocoa">จัดการหมวดและงบ</h1>
        {/* Month Selector */}
        <div className="flex items-center gap-1 rounded-xl bg-muted/50 p-1">
          <button onClick={handlePrevMonth} className="p-1 rounded-lg hover:bg-background text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-cocoa min-w-[70px] text-center">
            {format(currentMonthDate, 'MMM yyyy', { locale: th })}
          </span>
          <button onClick={handleNextMonth} className="p-1 rounded-lg hover:bg-background text-muted-foreground">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* รอบตัดงบ */}
      <section className="paper-card flex items-center justify-between p-4 mt-4">
        <div>
          <div className="font-semibold text-cocoa">รอบตัดงบ</div>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            รายเดือน (วันที่ {billingCycle})
          </div>
        </div>
        <button 
          onClick={() => setIsCycleDialogOpen(true)}
          className="flex items-center gap-1.5 rounded-2xl border border-border bg-background px-4 py-2 text-sm cursor-pointer"
        >
          <Pencil className="h-4 w-4" /> ตั้งค่า
        </button>
      </section>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={() => setTab("รายจ่าย")}
          className={`rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${
            tab === "รายจ่าย"
              ? "border-primary bg-pink-soft text-primary"
              : "border-transparent bg-card text-muted-foreground"
          }`}
        >
          รายจ่าย
        </button>
        <button
          onClick={() => setTab("รายรับ")}
          className={`rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${
            tab === "รายรับ"
              ? "border-mint bg-mint-soft text-mint-foreground"
              : "border-transparent bg-card text-muted-foreground"
          }`}
        >
          รายรับ
        </button>
      </div>

      {/* Sort */}
      <div className="mt-4">
        <button className="flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2 text-sm text-cocoa shadow-soft">
          <ListFilter className="h-4 w-4" /> จัดเรียง
        </button>
      </div>

      {/* List */}
      <ul className="space-y-3 mt-4 pb-20">
        {list.map((c) => {
          const spending = categorySpending.find(s => s.category === c.name || s.category_id === c.id);
          const hasBudget = spending?.budget != null && spending.budget > 0;
          const spent = spending?.spent || 0;
          const budget = spending?.budget || 0;
          const remaining = hasBudget ? budget - spent : null;
          const pct = hasBudget && budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
          const over = hasBudget && remaining! < 0;
          
          return (
            <li
              key={c.id}
              onClick={() => openBudgetDialog(c, spending)}
              className="paper-card flex items-center gap-3 p-4 transition-transform active:scale-[0.99] cursor-pointer"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cream text-2xl">{c.icon || '📦'}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cocoa">{c.name}</div>
                {hasBudget ? (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${over ? "bg-destructive" : (tab === "รายจ่าย" ? "bg-primary" : "bg-mint")}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      งบ {fmtBahtShort(budget)}
                    </span>
                  </div>
                ) : (
                  <div className="mt-0.5 text-xs text-muted-foreground">ยังไม่ตั้ง{tab === "รายจ่าย" ? "งบ" : "เป้าหมาย"}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[11px] text-muted-foreground">{tab === "รายจ่าย" ? "ใช้ไป" : "รับแล้ว"}</div>
                <div className={`text-sm font-semibold ${tab === "รายจ่าย" ? "text-primary" : "text-mint-foreground"}`}>
                  {fmtBahtShort(spent)}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </li>
          );
        })}
      </ul>

      {/* Cycle Dialog */}
      <Dialog open={isCycleDialogOpen} onOpenChange={setIsCycleDialogOpen}>
        <DialogContent className="w-[90vw] max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>ตั้งรอบตัดงบ</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm text-cocoa font-medium mb-2 block">วันที่ตัดงบ (1-28)</label>
            <input 
              type="number" 
              min="1" 
              max="28" 
              value={cycleInput} 
              onChange={e => setCycleInput(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <DialogFooter className="gap-2">
            <button onClick={() => setIsCycleDialogOpen(false)} className="rounded-xl px-4 py-2 border border-border">
              ยกเลิก
            </button>
            <button onClick={handleSaveCycle} className="rounded-xl px-4 py-2 bg-primary text-primary-foreground font-semibold">
              บันทึก
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Budget Dialog */}
      <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
        <DialogContent className="w-[90vw] max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>ตั้งงบ: {selectedCat?.name || selectedCat?.category}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm text-cocoa font-medium mb-2 block">จำนวนเงิน (บาท)</label>
            <input 
              type="number" 
              value={budgetInput} 
              onChange={e => setBudgetInput(e.target.value)}
              placeholder="เช่น 5000"
              className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <DialogFooter className="gap-2">
            <button onClick={() => setIsBudgetDialogOpen(false)} className="rounded-xl px-4 py-2 border border-border" disabled={isSavingBudget}>
              ยกเลิก
            </button>
            <button onClick={handleSaveBudget} disabled={isSavingBudget} className="rounded-xl px-4 py-2 bg-primary text-primary-foreground font-semibold disabled:opacity-50">
              {isSavingBudget ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </PageShell>
  );
}
