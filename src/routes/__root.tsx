import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import liff from "@line/liff";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mali:wght@500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isLiffReady, setIsLiffReady] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        // LIFF ID should be in env or provided by user
        // Using a placeholder; user should replace this in Vercel env
        const liffId = import.meta.env.VITE_LIFF_ID || "";
        if (!liffId) {
          console.warn("LIFF ID is missing. Profile fetching will be skipped.");
          setIsLiffReady(true);
          return;
        }

        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const profile = await liff.getProfile();
          // Store LINE userId in session storage for the API to pick up
          sessionStorage.setItem("line_user_id", profile.userId);
          sessionStorage.setItem("line_display_name", profile.displayName);
          sessionStorage.setItem("line_picture_url", profile.pictureUrl || "");
          setIsLiffReady(true);
        }
      } catch (error) {
        console.error("LIFF Initialization failed", error);
        setIsLiffReady(true);
      }
    };

    initLiff();
  }, []);

  if (!isLiffReady && import.meta.env.VITE_LIFF_ID) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf6ee]">
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-4">🍱</div>
          <p className="font-display text-cocoa">กำลังเตรียมตัวจด...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
