import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { J } from "../_libs/next-themes.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CdvELTkK.mjs";
import { o as objectType, s as stringType, n as numberType, a as anyType } from "../_libs/zod.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-BJ2iJffJ.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#fbf6ee" },
      { title: "Wanjot – บันทึกรายรับรายจ่าย" },
      { name: "description", content: "มินิแอปบนไลน์ บันทึกเงินเข้า-ออก เห็นภาพรวมไว เชื่อมต่อกับ Google Sheet" },
      { property: "og:title", content: "Wanjot – บันทึกรายรับรายจ่าย" },
      { property: "og:description", content: "บันทึกเงินเข้า-ออก เห็นภาพรวมไว เชื่อมต่อกับ Google Sheet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mali:wght@500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(J, { attribute: "class", defaultTheme: "system", enableSystem: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$6 = () => import("./settings-CDQGjjjg.mjs");
const Route$6 = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "ตั้งค่า – Wanjot"
    }, {
      name: "description",
      content: "ตั้งค่าและเชื่อม Google Sheet"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getDashboardData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  month: stringType().optional(),
  billingCycleDate: numberType().optional()
}).optional()).handler(createSsrRpc("4226c16603af43be9a545baef63240eeee3cb6898461dc7c53bfde2788c6deef"));
const getTransactionsList = createServerFn({
  method: "GET"
}).handler(createSsrRpc("65ce070768335b90748a17b626370ae35a5ffecb0b64ca939639925b013013ac"));
const getCategoriesData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  month: stringType().optional(),
  billingCycleDate: numberType().optional()
}).optional()).handler(createSsrRpc("7097bef873e2918adfdeeb1df8dadd0e40dd87e3dd650a51998023b933657d4c"));
const createTransaction = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("993e05ba05bf5c74900cbb5475b853f6fab07f7e90dab586cc09502158ba18db"));
const getEditData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  id: stringType()
})).handler(createSsrRpc("ca38dc0603e69fbc75fc7b4cf11ba6f65933f415938363c0b809c33499e20140"));
const updateTransactionFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  data: anyType()
})).handler(createSsrRpc("cab161165844926289194938bfaa918493ce838242ea299a63b89cecd971cb88"));
const deleteTransactionFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType()
})).handler(createSsrRpc("80e3ec7770e18c872ca2ea0fefe4df0a04e60e71b9747169f7d69ba15ad854e3"));
const updateBudgetFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("1668ff1b022fc17b476f6f424dd2c24811323a0fd995ebad8488e16503b95cc7"));
const $$splitComponentImporter$5 = () => import("./list-DA9FF-z_.mjs");
const Route$5 = createFileRoute("/list")({
  head: () => ({
    meta: [{
      title: "รายการ – Wanjot"
    }, {
      name: "description",
      content: "รายการรายรับรายจ่ายทั้งหมด"
    }]
  }),
  loader: async () => await getTransactionsList(),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./categories-CP2ylCF9.mjs");
const searchSchema$1 = objectType({
  month: stringType().optional()
});
const Route$4 = createFileRoute("/categories")({
  validateSearch: searchSchema$1,
  head: () => ({
    meta: [{
      title: "หมวด / งบ – Wanjot"
    }, {
      name: "description",
      content: "จัดการหมวดหมู่รายรับรายจ่ายและตั้งงบประมาณรายเดือน"
    }, {
      property: "og:title",
      content: "หมวด / งบ – Wanjot"
    }, {
      property: "og:description",
      content: "จัดการหมวดและงบประมาณ"
    }]
  }),
  loaderDeps: ({
    search: {
      month
    }
  }) => ({
    month
  }),
  loader: async ({
    deps: {
      month
    }
  }) => {
    let billingCycleDate = 1;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wanjot_billingCycleDate");
      if (stored) billingCycleDate = parseInt(stored, 10);
    }
    return await getCategoriesData({
      data: {
        month,
        billingCycleDate
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./analyze-CI0iJj-3.mjs");
const Route$3 = createFileRoute("/analyze")({
  head: () => ({
    meta: [{
      title: "วิเคราะห์ – Wanjot"
    }, {
      name: "description",
      content: "วิเคราะห์รายรับรายจ่าย"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./add-DYPJWoWS.mjs");
const Route$2 = createFileRoute("/add")({
  head: () => ({
    meta: [{
      title: "เพิ่มรายการ – Wanjot"
    }]
  }),
  loader: async () => await getCategoriesData(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DjqMdlYu.mjs");
const searchSchema = objectType({
  month: stringType().optional()
});
const Route$1 = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Wanjot – บันทึกรายรับรายจ่าย"
    }, {
      name: "description",
      content: "มินิแอปบนไลน์ บันทึกเงินเข้า-ออก เห็นภาพรวมไว ทำงานร่วมกับ Google Sheet"
    }, {
      property: "og:title",
      content: "Wanjot – บันทึกรายรับรายจ่าย"
    }, {
      property: "og:description",
      content: "บันทึกเงินเข้า-ออก เห็นภาพรวมไว ทำงานร่วมกับ Google Sheet"
    }]
  }),
  loaderDeps: ({
    search: {
      month
    }
  }) => ({
    month
  }),
  loader: async ({
    deps: {
      month
    }
  }) => {
    let billingCycleDate = 1;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wanjot_billingCycleDate");
      if (stored) billingCycleDate = parseInt(stored, 10);
    }
    return await getDashboardData({
      data: {
        month,
        billingCycleDate
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./edit._id-Dr42D4AW.mjs");
const Route = createFileRoute("/edit/$id")({
  head: () => ({
    meta: [{
      title: "แก้ไขรายการ – Wanjot"
    }]
  }),
  loader: async ({
    params
  }) => await getEditData({
    data: {
      id: params.id
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$6.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$7
});
const ListRoute = Route$5.update({
  id: "/list",
  path: "/list",
  getParentRoute: () => Route$7
});
const CategoriesRoute = Route$4.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => Route$7
});
const AnalyzeRoute = Route$3.update({
  id: "/analyze",
  path: "/analyze",
  getParentRoute: () => Route$7
});
const AddRoute = Route$2.update({
  id: "/add",
  path: "/add",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const EditIdRoute = Route.update({
  id: "/edit/$id",
  path: "/edit/$id",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AddRoute,
  AnalyzeRoute,
  CategoriesRoute,
  ListRoute,
  SettingsRoute,
  EditIdRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  Route$2 as a,
  Route$1 as b,
  createTransaction as c,
  Route as d,
  deleteTransactionFn as e,
  updateTransactionFn as f,
  router as r,
  updateBudgetFn as u
};
