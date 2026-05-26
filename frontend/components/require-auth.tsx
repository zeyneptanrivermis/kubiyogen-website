"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { apiRequest, getToken } from "@/lib/api-client";

type Me = {
  role: string;
};

type RequireAuthProps = {
  children: ReactNode;
  adminOnly?: boolean;
  title?: string;
};

export function RequireAuth({ children, adminOnly = false, title = "Giriş gerekli" }: RequireAuthProps) {
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }
    apiRequest<Me>("/auth/me").then((result) => {
      setAllowed(Boolean(result.data && (!adminOnly || result.data.role === "ADMIN")));
      setReady(true);
    });
  }, [adminOnly]);

  if (!ready) {
    return (
      <div className="rounded-lg border border-line bg-white p-6 text-sm text-slate-600 shadow-card">
        Kontrol ediliyor.
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="rounded-lg border border-line bg-white p-6 shadow-card">
        <p className="text-sm font-semibold text-brand-700">{title}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">
          {adminOnly ? "Bu alan yalnızca yöneticiler içindir." : "Bu alanı görmek için giriş yapmalısınız."}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Hesaba özel bilgiler ve işlem alanları oturum açmadan gösterilmez.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/giris" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
            Giriş Yap
          </Link>
          <Link href="/kayit" className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
            Kayıt Ol
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
