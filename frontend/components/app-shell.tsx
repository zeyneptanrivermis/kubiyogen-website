"use client";

import { usePathname } from "next/navigation";

type AppShellProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  floatingActions: React.ReactNode;
};

export function AppShell({ children, header, footer, floatingActions }: AppShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
      {floatingActions}
    </>
  );
}
