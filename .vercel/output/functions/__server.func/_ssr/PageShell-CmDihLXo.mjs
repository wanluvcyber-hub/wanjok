import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, f as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { b as ChevronLeft, X, H as House, j as ChartColumn, k as ChartPie, l as ListOrdered, m as Settings } from "../_libs/lucide-react.mjs";
const items = [
  { to: "/", label: "สรุป", icon: House },
  { to: "/analyze", label: "วิเคราะห์", icon: ChartColumn },
  { to: "/categories", label: "หมวด / งบ", icon: ChartPie },
  { to: "/list", label: "รายการ", icon: ListOrdered },
  { to: "/settings", label: "ตั้งค่า", icon: Settings }
];
function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md border-t border-border/60 bg-card/95 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex items-center justify-around px-2 pt-2 pb-3", children: items.map(({ to, label, icon: Icon }) => {
    const active = pathname === to;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        className: `flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: active ? 2.4 : 1.8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] ${active ? "font-semibold" : ""}`, children: label })
        ]
      }
    ) }, to);
  }) }) });
}
function PageShell({ title, children, backTo = "/" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md pb-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: backTo, className: "rounded-full p-1.5 text-muted-foreground hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6", strokeWidth: 2.2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "app.wanjot.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full p-1.5 text-muted-foreground hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6", strokeWidth: 2.2 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "space-y-4 px-4 pt-2", children })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  PageShell as P
};
