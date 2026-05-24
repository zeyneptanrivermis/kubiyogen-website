import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";

export const metadata: Metadata = {
  title: "Kubiyogen",
  description: "Kubiyogen egitim, etkinlik ve aksesuar deneyimi"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
