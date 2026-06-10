import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useLoaderData, e as useNavigate, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-CmDihLXo.mjs";
import { f as fmtBahtShort, c as cn } from "./utils-ZaSGHOxr.mjs";
import { R as Route$4, u as updateBudgetFn } from "./router-CKoNz1-i.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/seroval.mjs";
import { p as parseISO, f as format, s as subMonths, a as addMonths, t as th } from "../_libs/date-fns.mjs";
import { b as ChevronLeft, C as ChevronRight, a as Calendar, c as Pencil, d as ListFilter, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function CategoriesPage() {
  const {
    categories,
    categorySpending
  } = useLoaderData({
    from: "/categories"
  });
  const {
    month
  } = Route$4.useSearch();
  const navigate = useNavigate({
    from: "/categories"
  });
  const router = useRouter();
  const [tab, setTab] = reactExports.useState("รายจ่าย");
  const [billingCycle, setBillingCycle] = reactExports.useState(1);
  const [isCycleDialogOpen, setIsCycleDialogOpen] = reactExports.useState(false);
  const [cycleInput, setCycleInput] = reactExports.useState("1");
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = reactExports.useState(false);
  const [selectedCat, setSelectedCat] = reactExports.useState(null);
  const [budgetInput, setBudgetInput] = reactExports.useState("");
  const [isSavingBudget, setIsSavingBudget] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("wanjot_billingCycleDate");
    if (stored) {
      setBillingCycle(parseInt(stored, 10));
      setCycleInput(stored);
    }
  }, []);
  const handleSaveCycle = () => {
    let val = parseInt(cycleInput, 10);
    if (isNaN(val) || val < 1 || val > 28) val = 1;
    setBillingCycle(val);
    localStorage.setItem("wanjot_billingCycleDate", val.toString());
    setIsCycleDialogOpen(false);
    navigate({
      search: (prev) => ({
        ...prev
      }),
      replace: true
    });
  };
  const handleSaveBudget = async () => {
    if (!selectedCat) return;
    setIsSavingBudget(true);
    try {
      const amount = parseFloat(budgetInput) || 0;
      await updateBudgetFn({
        data: {
          user_id: "a1b2c3d4-0000-0000-0000-000000000001",
          category_id: selectedCat.category_id || selectedCat.id,
          // Fallback for pure category object vs spending view
          amount
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
  const openBudgetDialog = (c, spending) => {
    setSelectedCat(spending || c);
    setBudgetInput(spending?.budget ? spending.budget.toString() : "");
    setIsBudgetDialogOpen(true);
  };
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
  const list = categories.filter((c) => c.type === tab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { title: "จัดการหมวดและงบ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-cocoa", children: "จัดการหมวดและงบ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-xl bg-muted/50 p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePrevMonth, className: "p-1 rounded-lg hover:bg-background text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-cocoa min-w-[70px] text-center", children: format(currentMonthDate, "MMM yyyy", {
          locale: th
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleNextMonth, className: "p-1 rounded-lg hover:bg-background text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card flex items-center justify-between p-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: "รอบตัดงบ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          "รายเดือน (วันที่ ",
          billingCycle,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsCycleDialogOpen(true), className: "flex items-center gap-1.5 rounded-2xl border border-border bg-background px-4 py-2 text-sm cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
        " ตั้งค่า"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("รายจ่าย"), className: `rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${tab === "รายจ่าย" ? "border-primary bg-pink-soft text-primary" : "border-transparent bg-card text-muted-foreground"}`, children: "รายจ่าย" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("รายรับ"), className: `rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${tab === "รายรับ" ? "border-mint bg-mint-soft text-mint-foreground" : "border-transparent bg-card text-muted-foreground"}`, children: "รายรับ" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2 text-sm text-cocoa shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListFilter, { className: "h-4 w-4" }),
      " จัดเรียง"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 mt-4 pb-20", children: list.map((c) => {
      const spending = categorySpending.find((s) => s.category === c.name || s.category_id === c.id);
      const hasBudget = spending?.budget != null && spending.budget > 0;
      const spent = spending?.spent || 0;
      const budget = spending?.budget || 0;
      const remaining = hasBudget ? budget - spent : null;
      const pct = hasBudget && budget > 0 ? Math.min(spent / budget * 100, 100) : 0;
      const over = hasBudget && remaining < 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { onClick: () => openBudgetDialog(c, spending), className: "paper-card flex items-center gap-3 p-4 transition-transform active:scale-[0.99] cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-2xl bg-cream text-2xl", children: c.icon || "📦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: c.name }),
          hasBudget ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${over ? "bg-destructive" : tab === "รายจ่าย" ? "bg-primary" : "bg-mint"}`, style: {
              width: `${pct}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground whitespace-nowrap", children: [
              "งบ ",
              fmtBahtShort(budget)
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-xs text-muted-foreground", children: [
            "ยังไม่ตั้ง",
            tab === "รายจ่าย" ? "งบ" : "เป้าหมาย"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: tab === "รายจ่าย" ? "ใช้ไป" : "รับแล้ว" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-semibold ${tab === "รายจ่าย" ? "text-primary" : "text-mint-foreground"}`, children: fmtBahtShort(spent) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
      ] }, c.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isCycleDialogOpen, onOpenChange: setIsCycleDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[90vw] max-w-[400px] rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "ตั้งรอบตัดงบ" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-cocoa font-medium mb-2 block", children: "วันที่ตัดงบ (1-28)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "28", value: cycleInput, onChange: (e) => setCycleInput(e.target.value), className: "w-full border border-border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsCycleDialogOpen(false), className: "rounded-xl px-4 py-2 border border-border", children: "ยกเลิก" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveCycle, className: "rounded-xl px-4 py-2 bg-primary text-primary-foreground font-semibold", children: "บันทึก" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isBudgetDialogOpen, onOpenChange: setIsBudgetDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[90vw] max-w-[400px] rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "ตั้งงบ: ",
        selectedCat?.name || selectedCat?.category
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-cocoa font-medium mb-2 block", children: "จำนวนเงิน (บาท)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: budgetInput, onChange: (e) => setBudgetInput(e.target.value), placeholder: "เช่น 5000", className: "w-full border border-border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsBudgetDialogOpen(false), className: "rounded-xl px-4 py-2 border border-border", disabled: isSavingBudget, children: "ยกเลิก" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveBudget, disabled: isSavingBudget, className: "rounded-xl px-4 py-2 bg-primary text-primary-foreground font-semibold disabled:opacity-50", children: isSavingBudget ? "กำลังบันทึก..." : "บันทึก" })
      ] })
    ] }) })
  ] });
}
export {
  CategoriesPage as component
};
