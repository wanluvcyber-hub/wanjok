import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./PageShell-CmDihLXo.mjs";
import { z } from "../_libs/next-themes.mjs";
import { F as FileSpreadsheet, C as ChevronRight, B as Bell, M as Moon, S as Sun, I as Info } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function SettingsPage() {
  const {
    theme,
    setTheme
  } = z();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { title: "ตั้งค่า", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "px-1 pt-2 text-center font-display text-3xl font-bold text-cocoa", children: "ตั้งค่า" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card divide-y divide-border/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-3 p-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: "เชื่อม Google Sheet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "ดึงข้อมูลจากชีตของคุณ" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-3 p-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: "การแจ้งเตือน" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "เตือนเมื่อใกล้เกินงบ" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTheme(theme === "dark" ? "light" : "dark"), className: "flex w-full items-center gap-3 p-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cream", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: "ธีมและสี" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: theme === "dark" ? "โหมดกลางคืน (คลิกเพื่อเปลี่ยน)" : "โหมดกลางวัน (คลิกเพื่อเปลี่ยน)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-3 p-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cocoa", children: "เกี่ยวกับ Wanjot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "เวอร์ชัน 0.1.0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center text-xs text-muted-foreground", children: "ทำด้วย ❤️ สำหรับ LINE Mini App · มินิแอป Wanjot" })
  ] });
}
export {
  SettingsPage as component
};
