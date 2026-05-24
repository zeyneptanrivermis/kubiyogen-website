"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest, clearToken, getToken } from "@/lib/api-client";

type Me = {
  email: string;
  role: string;
};

export function AuthActions({ mobile = false }: { mobile?: boolean }) {
  const [me, setMe] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }
    apiRequest<Me>("/auth/me").then((result) => {
      if (result.data) setMe(result.data);
      if (result.error) clearToken();
      setReady(true);
    });
  }, []);

  const baseClass = mobile
    ? "rounded-lg border border-line px-3 py-3 text-center text-sm font-semibold text-ink"
    : "text-sm font-semibold text-slate-700 hover:text-brand-700 px-3 py-2 transition duration-200";

  const primaryClass = mobile
    ? "rounded-lg bg-brand-700 px-3 py-3 text-center text-sm font-semibold text-white"
    : "rounded-full bg-brand-700 hover:bg-brand-800 px-5 py-2 text-sm font-bold text-white transition duration-200 shadow-sm";

  if (!ready) return null;

  if (!me) {
    return (
      <div className={mobile ? "flex flex-col gap-2 w-full" : "flex items-center gap-2"}>
        <Link href="/giris" className={baseClass}>Giriş</Link>
        <Link href="/kayit" className={primaryClass}>Kayıt Ol</Link>
      </div>
    );
  }

  return (
    <div className={mobile ? "flex flex-col gap-2 w-full" : "flex items-center gap-2"}>
      <Link href="/profil" className={baseClass}>Profil</Link>
      <Link href="/sepet" className={primaryClass}>Sepet</Link>
      <button
        type="button"
        onClick={() => {
          clearToken();
          window.location.href = "/";
        }}
        className={baseClass}
      >
        Çıkış
      </button>
    </div>
  );
}
