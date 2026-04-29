import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Kubiyogen",
  description: "Kubiyogen egitim, etkinlik ve aksesuar deneyimi"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <AppShell header={<SiteHeader />} footer={<SiteFooter />} floatingActions={<FloatingActions />}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
