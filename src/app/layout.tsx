import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import SessionProvider from "@/components/layout/SessionProvider";
import ContentProvider from "@/components/layout/ContentProvider";
import ServiceWorkerRegistrar from "@/components/layout/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Classroom Tanzania — Tanzania & Zanzibar Study App",
  description:
    "Learn, revise, and test yourself against the Tanzania Mainland (NECTA) and Zanzibar (ZEC) syllabus.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Classroom Tanzania",
    statusBarStyle: "black-translucent",
  },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* #root preserves the selector the original stylesheet targets. */}
        <div id="root">
          <SessionProvider>
            <ContentProvider>
              <AppShell>{children}</AppShell>
            </ContentProvider>
          </SessionProvider>
        </div>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
