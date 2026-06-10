import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useLoaderData, e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-CmDihLXo.mjs";
import { a as fmtBaht, f as fmtBahtShort } from "./utils-ZaSGHOxr.mjs";
import { b as Route$1 } from "./router-CKoNz1-i.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/seroval.mjs";
import { p as parseISO, f as format, s as subMonths, a as addMonths, t as th } from "../_libs/date-fns.mjs";
import { b as ChevronLeft, C as ChevronRight, A as ArrowLeftRight, f as Flame, g as ChevronDown, P as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CdvELTkK.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
const avatar = "/assets/wanjot-avatar-BkuYOC8q.jpg";
function Dashboard() {
  const {
    transactions,
    categorySpending,
    summary
  } = useLoaderData({
    from: "/"
  });
  const {
    month
  } = Route$1.useSearch();
  const navigate = useNavigate({
    from: "/"
  });
  const [topCatTab, setTopCatTab] = reactExports.useState("รายจ่าย");
  const [billingCycle, setBillingCycle] = reactExports.useState(1);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("wanjot_billingCycleDate");
    if (stored && parseInt(stored, 10) !== billingCycle) {
      setBillingCycle(parseInt(stored, 10));
      navigate({
        search: (prev) => ({
          ...prev
        }),
        replace: true
      });
    }
  }, [billingCycle, navigate]);
  const currentMonthDate = month ? parseISO(`${month}-01`) : /* @__PURE__ */ new Date();
  const handlePrevMonth = () => {
    const prev = subMonths(currentMonthDate);
    navigate({
      search: {
        month: format(prev, "yyyy-MM")
      }
    });
  };
  const handleNextMonth = () => {
    const next = addMonths(currentMonthDate, 1);
    navigate({
      search: {
        month: format(next, "yyyy-MM")
      }
    });
  };
  const income = summary.filter((s) => s.type === "รายรับ").reduce((s, t) => s + (t.total || 0), 0);
  const expense = summary.filter((s) => s.type === "รายจ่าย").reduce((s, t) => s + (t.total || 0), 0);
  const balance = income - expense;
  const expenseCats = categorySpending.filter((c) => c.type === "รายจ่าย" && (c.spent || 0) > 0).sort((a, b) => (b.spent || 0) - (a.spent || 0));
  const incomeCats = categorySpending.filter((c) => c.type === "รายรับ" && (c.spent || 0) > 0).sort((a, b) => (b.spent || 0) - (a.spent || 0));
  const totalExp = expenseCats.reduce((s, c) => s + (c.spent || 0), 0);
  const totalInc = incomeCats.reduce((s, c) => s + (c.spent || 0), 0);
  const R = 64;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const palette = ["var(--primary)", "oklch(0.78 0.18 358)", "oklch(0.85 0.10 358)", "var(--pink-soft)", "oklch(0.72 0.06 280)", "oklch(0.85 0.04 250)", "var(--cream)"];
  const totalBudget = categorySpending.reduce((s, c) => s + (c.budget || 0), 0);
  const totalSpent = categorySpending.filter((c) => c.type === "รายจ่าย").reduce((s, c) => s + (c.spent || 0), 0);
  const budgetRemaining = totalBudget - totalSpent;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { title: "สรุป", backTo: "/", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card flex items-center gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatar, alt: "Wanjot avatar", className: "h-16 w-16 rounded-full object-cover ring-2 ring-pink-soft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground shadow", children: "ฟรี" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-cocoa", children: "Wanjot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "เด็กช่างฝัน · บันทึกเงินสนุกๆ" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-cocoa", children: "สรุป" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-muted/50 p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePrevMonth, className: "p-1 rounded-lg hover:bg-background text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-cocoa min-w-[80px] text-center", children: format(currentMonthDate, "MMM yyyy", {
            locale: th
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleNextMonth, className: "p-1 rounded-lg hover:bg-background text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-2xl border border-border/70 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "เหลือเก็บ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground", children: [
            "รอบงบนี้ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 font-display text-4xl font-bold ${balance < 0 ? "text-destructive" : "text-mint-foreground"}`, children: fmtBaht(balance) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-primary/40 bg-pink-soft/50 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cocoa/70", children: "รายจ่าย" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-primary", children: fmtBaht(-expense) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-mint/50 bg-mint-soft/60 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cocoa/70", children: "รายรับ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-mint-foreground", children: fmtBaht(income) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_1fr] items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "160", height: "160", viewBox: "0 0 160 160", className: "-rotate-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "80", cy: "80", r: R, fill: "none", stroke: "var(--muted)", strokeWidth: "18" }),
          expenseCats.map((c, i) => {
            const pct = (c.spent || 0) / (totalExp || 1);
            const dash = pct * C;
            const el = /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "80", cy: "80", r: R, fill: "none", stroke: palette[i % palette.length], strokeWidth: "18", strokeDasharray: `${dash} ${C - dash}`, strokeDashoffset: -offset, strokeLinecap: "butt" }, c.category || i);
            offset += dash;
            return el;
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              "จดติดต่อมา ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-primary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cocoa", children: "1 วัน" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "จำนวนรายการ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cocoa", children: transactions.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "งบที่ตั้งไว้" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cocoa", children: fmtBahtShort(totalBudget) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "งบคงเหลือ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: fmtBahtShort(budgetRemaining) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "รอบงบ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-cocoa", children: [
              "วันที่ ",
              billingCycle
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-5 flex w-full items-center justify-center gap-1 rounded-2xl border border-border bg-background py-3 text-sm text-cocoa", children: [
        "ดูเพิ่ม ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-cocoa", children: "หมวดที่ใช้มากสุด" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 rounded-full bg-muted p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTopCatTab("รายจ่าย"), className: `rounded-full px-3 py-1 text-xs font-medium transition-all ${topCatTab === "รายจ่าย" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`, children: "รายจ่าย" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTopCatTab("รายรับ"), className: `rounded-full px-3 py-1 text-xs font-medium transition-all ${topCatTab === "รายรับ" ? "bg-mint text-mint-foreground shadow-sm" : "text-muted-foreground"}`, children: "รายรับ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
        (topCatTab === "รายจ่าย" ? expenseCats : incomeCats).slice(0, 4).map((c, i) => {
          const currentTotal = topCatTab === "รายจ่าย" ? totalExp : totalInc;
          const pct = currentTotal ? (c.spent || 0) / currentTotal * 100 : 0;
          const ofBudget = c.budget ? Math.min((c.spent || 0) / c.budget * 100, 100) : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-cocoa", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: c.icon || "📦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${topCatTab === "รายจ่าย" ? "text-primary" : "text-mint-foreground"}`, children: fmtBahtShort(topCatTab === "รายจ่าย" ? -(c.spent || 0) : c.spent || 0) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
              width: `${ofBudget ?? pct}%`,
              background: topCatTab === "รายจ่าย" ? palette[i % palette.length] : "var(--mint)"
            } }) })
          ] }, c.category || i);
        }),
        (topCatTab === "รายจ่าย" ? expenseCats : incomeCats).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "py-4 text-center text-sm text-muted-foreground", children: "ไม่มีข้อมูลในหมวดนี้" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/categories", className: "mt-4 block text-center text-xs font-medium text-primary", children: "ดูทั้งหมด →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/add", "aria-label": "เพิ่มรายการ", className: "fixed bottom-24 right-5 z-30 rounded-full bg-primary p-4 text-primary-foreground shadow-pop transition-transform active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6", strokeWidth: 2.6 }) })
  ] });
}
export {
  Dashboard as component
};
