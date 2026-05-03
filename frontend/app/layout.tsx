import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { FloatingActions } from "@/components/floating-actions";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Kubiyogen",
  description: "Kubiyogen egitim, etkinlik ve aksesuar deneyimi"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <ToastProvider>
          <AppShell header={<Navbar />} footer={<Footer />} floatingActions={<FloatingActions />}>
            {children}
          </AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
