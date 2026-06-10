import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { fmtBahtShort, thaiDate } from "@/lib/utils";
import { Calendar, Download, ListChecks, RefreshCcw, Plus, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { getTransactionsList } from "@/lib/api/finance.functions";
import { useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/list")({
  head: () => ({ meta: [{ title: "รายการ – Wanjot" }, { name: "description", content: "รายการรายรับรายจ่ายทั้งหมด" }] }),
  loader: async () => await getTransactionsList(),
  component: ListPage,
});

function ListPage() {
  const transactions = useLoaderData({ from: "/list" });
  const [filter, setFilter] = useState<"all" | "รายจ่าย" | "รายรับ">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [filter, transactions]);

  const grouped = useMemo(() => {
    const m = new Map<string, typeof filtered>();
    for (const t of filtered) {
      const k = t.transacted_at.split('T')[0];
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(t);
    }
    return [...m.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  const tabs: { id: typeof filter; label: string }[] = [
    { id: "all", label: "ทั้งหมด" },
    { id: "รายจ่าย", label: "รายจ่าย" },
    { id: "รายรับ", label: "รายรับ" },
  ];

  return (
    <PageShell title="รายการ">
      <section className="paper-card flex items-center justify-center gap-2 p-4 text-cocoa">
        <Calendar className="h-5 w-5" />
        <span className="font-display text-base font-semibold">
          {new Date().toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}
        </span>
      </section>

      <section className="paper-card flex items-center gap-3 p-4">
        <div className="flex-1">
          <div className="mb-2 font-display text-base font-bold text-cocoa">คัดกรองประเภทรายการ</div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  filter === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <button className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card text-cocoa">
          <div className="flex flex-col items-center text-[10px]">
            <Download className="h-4 w-4" /> ส่งออก
          </div>
        </button>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-cocoa">
          <ListChecks className="h-4 w-4" /> เลือกหลายรายการ
        </button>
        <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-cocoa">
          <RefreshCcw className="h-4 w-4" /> ตั้งรายการจดประจำ
        </button>
      </div>

      {grouped.map(([date, items]) => {
        const sum = items.reduce((s, t) => s + (t.type === 'รายจ่าย' ? -t.amount : t.amount), 0);
        return (
          <section key={date} className="space-y-2">
            <div className="flex items-center justify-between border-b border-border px-1 pb-1.5 text-sm">
              <span className="text-muted-foreground">{thaiDate(date)}</span>
              <span className={`font-semibold ${sum < 0 ? "text-primary" : "text-mint-foreground"}`}>
                รวม: {fmtBahtShort(sum)}
              </span>
            </div>
            <ul className="space-y-2">
              {items.map((t) => (
                <li key={t.id}>
                  <Link
                    to="/edit/$id"
                    params={{ id: t.id }}
                    className="paper-card flex items-center gap-3 p-3.5 active:scale-[0.98] transition-transform"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-cocoa">
                        {t.note || (t.categories as any)?.name || t.type || "ไม่มีชื่อ"}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {new Date(t.transacted_at).toLocaleTimeString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          น.
                        </span>
                        <span className="rounded-md bg-muted px-1.5 py-0.5">
                          {(t.categories as any)?.name || t.type || "ทั่วไป"}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`font-display text-base font-bold ${t.type === "รายจ่าย" ? "text-primary" : "text-mint-foreground"}`}
                    >
                      {fmtBahtShort(t.type === "รายจ่าย" ? -t.amount : t.amount)}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <Link
        to="/add"
        aria-label="เพิ่มรายการ"
        className="fixed bottom-24 right-5 z-30 rounded-full bg-primary p-4 text-primary-foreground shadow-pop"
      >
        <Plus className="h-6 w-6" strokeWidth={2.6} />
      </Link>
    </PageShell>
  );
}
