import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-CmDihLXo.mjs";
import { a as Route$2, c as createTransaction } from "./router-CKoNz1-i.mjs";
import { B as Button, L as Label, I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DUZxPvtQ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/seroval.mjs";
import { b as ChevronLeft, e as Save } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CdvELTkK.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-ZaSGHOxr.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
function AddTransactionPage() {
  const {
    categories
  } = Route$2.useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    amount: "",
    type: "รายจ่าย",
    category_id: "",
    note: "",
    transacted_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
    // YYYY-MM-DDTHH:mm
  });
  reactExports.useEffect(() => {
    const firstCat = categories.find((c) => c.type === formData.type);
    if (firstCat) {
      setFormData((prev) => ({
        ...prev,
        category_id: firstCat.id
      }));
    }
  }, [formData.type, categories]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category_id) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setLoading(true);
    try {
      await createTransaction({
        data: {
          user_id: "a1b2c3d4-0000-0000-0000-000000000001",
          // Default seeded user
          amount: parseFloat(formData.amount),
          type: formData.type,
          category_id: formData.category_id,
          note: formData.note,
          transacted_at: new Date(formData.transacted_at).toISOString()
        }
      });
      toast.success("บันทึกรายการเรียบร้อยแล้ว");
      navigate({
        to: "/"
      });
    } catch (error) {
      console.error(error);
      toast.error(`เกิดข้อผิดพลาด: ${error.message || "ไม่สามารถบันทึกได้"}`);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { title: "เพิ่มรายการ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate({
        to: "/"
      }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-cocoa", children: "เพิ่มรายการ" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 paper-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFormData((prev) => ({
          ...prev,
          type: "รายจ่าย"
        })), className: `rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${formData.type === "รายจ่าย" ? "border-primary bg-pink-soft text-primary" : "border-transparent bg-muted text-muted-foreground"}`, children: "รายจ่าย" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFormData((prev) => ({
          ...prev,
          type: "รายรับ"
        })), className: `rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${formData.type === "รายรับ" ? "border-mint bg-mint-soft text-mint-foreground" : "border-transparent bg-muted text-muted-foreground"}`, children: "รายรับ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "จำนวนเงิน (บาท)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "amount", type: "number", step: "0.01", placeholder: "0.00", value: formData.amount, onChange: (e) => setFormData((prev) => ({
          ...prev,
          amount: e.target.value
        })), className: "text-2xl h-14 font-bold", autoFocus: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "หมวดหมู่" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.category_id, onValueChange: (val) => setFormData((prev) => ({
          ...prev,
          category_id: val
        })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "เลือกหมวดหมู่" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.filter((c) => c.type === formData.type).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.icon || "📦" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.name })
          ] }) }, c.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "note", children: "บันทึกช่วยจำ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "note", placeholder: "ซื้ออะไรไปนะ?", value: formData.note, onChange: (e) => setFormData((prev) => ({
          ...prev,
          note: e.target.value
        })), className: "h-12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "วันที่และเวลา" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "date", type: "datetime-local", value: formData.transacted_at, onChange: (e) => setFormData((prev) => ({
          ...prev,
          transacted_at: e.target.value
        })), className: "h-12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full h-14 text-lg font-bold mt-4", disabled: loading, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-5 w-5" }),
        loading ? "กำลังบันทึก..." : "บันทึกรายการ"
      ] })
    ] })
  ] }) });
}
export {
  AddTransactionPage as component
};
