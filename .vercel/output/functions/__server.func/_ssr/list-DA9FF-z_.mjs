import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useLoaderData, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-CmDihLXo.mjs";
import { t as thaiDate, f as fmtBahtShort } from "./utils-ZaSGHOxr.mjs";
import { a as Calendar, D as Download, L as ListChecks, R as RefreshCcw, C as ChevronRight, P as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
function ListPage() {
  const transactions = useLoaderData({
    from: "/list"
  });
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [filter, transactions]);
  const grouped = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const t of filtered) {
      const k = t.transacted_at.split("T")[0];
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(t);
    }
    return [...m.entries()].sort((a, b) => a[0] < b[0] ? 1 : -1);
  }, [filtered]);
  const tabs = [{
    id: "all",
    label: "ทั้งหมด"
  }, {
    id: "รายจ่าย",
    label: "รายจ่าย"
  }, {
    id: "รายรับ",
    label: "รายรับ"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { title: "รายการ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card flex items-center justify-center gap-2 p-4 text-cocoa", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-semibold", children: (/* @__PURE__ */ new Date()).toLocaleDateString("th-TH", {
        month: "short",
        year: "numeric"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card flex items-center gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 font-display text-base font-bold text-cocoa", children: "คัดกรองประเภทรายการ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(t.id), className: `rounded-full px-4 py-1.5 text-sm transition-colors ${filter === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: t.label }, t.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card text-cocoa", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " ส่งออก"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-cocoa", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }),
        " เลือกหลายรายการ"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-cocoa", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "h-4 w-4" }),
        " ตั้งรายการจดประจำ"
      ] })
    ] }),
    grouped.map(([date, items]) => {
      const sum = items.reduce((s, t) => s + (t.type === "รายจ่าย" ? -t.amount : t.amount), 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-1 pb-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: thaiDate(date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${sum < 0 ? "text-primary" : "text-mint-foreground"}`, children: [
            "รวม: ",
            fmtBahtShort(sum)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: items.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/edit/$id", params: {
          id: t.id
        }, className: "paper-card flex items-center gap-3 p-3.5 active:scale-[0.98] transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: t.note || t.categories?.name || t.type || "ไม่มีชื่อ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                new Date(t.transacted_at).toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit"
                }),
                " ",
                "น."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-muted px-1.5 py-0.5", children: t.categories?.name || t.type || "ทั่วไป" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-base font-bold ${t.type === "รายจ่าย" ? "text-primary" : "text-mint-foreground"}`, children: fmtBahtShort(t.type === "รายจ่าย" ? -t.amount : t.amount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
        ] }) }, t.id)) })
      ] }, date);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/add", "aria-label": "เพิ่มรายการ", className: "fixed bottom-24 right-5 z-30 rounded-full bg-primary p-4 text-primary-foreground shadow-pop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6", strokeWidth: 2.6 }) })
  ] });
}
export {
  ListPage as component
};
