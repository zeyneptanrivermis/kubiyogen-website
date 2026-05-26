"use client";

import { FormEvent, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { RequireAuth } from "@/components/require-auth";

type AccessCodePlayerProps = {
  initialCode: string;
};

type ValidateResponse = {
  valid: boolean;
  accessCode: {
    code: string;
    expiresAt: string;
    useCount: number;
    maxUses: number;
  };
};

export function AccessCodePlayer({ initialCode }: AccessCodePlayerProps) {
  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState("Kod henuz dogrulanmadi.");
  const [unlocked, setUnlocked] = useState(false);

  const validate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await apiRequest<ValidateResponse>("/access-codes/validate", {
      method: "POST",
      body: JSON.stringify({ code })
    });
    if (result.error || !result.data) {
      setUnlocked(false);
      setStatus(result.error ?? "Kod dogrulanamadi.");
      return;
    }
    setUnlocked(true);
    setStatus(`Kod aktif. Kullanim: ${result.data.accessCode.useCount}/${result.data.accessCode.maxUses}`);
  };

  return (
    <RequireAuth title="Dijital içerik için giriş gerekli">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="aspect-video rounded-lg border border-line bg-slate-950 p-6 text-white shadow-card">
        <div className="flex h-full items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-center text-sm leading-7 text-slate-300">
          {unlocked ? "Dogrulanmis dijital egitim oynaticisi hazir." : "Video/egitim modulu kod dogrulandiktan sonra acilir."}
        </div>
      </div>
      <aside className="rounded-lg border border-line bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">Erisim Kodu</h2>
        <form onSubmit={validate} className="mt-5 grid gap-3">
          <input value={code} onChange={(event) => setCode(event.target.value)} className="rounded-lg border border-line px-4 py-3" />
          <button className="rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white">Kodu Dogrula</button>
        </form>
        <p className="mt-4 rounded-lg bg-soft p-3 text-sm leading-7 text-slate-700">{status}</p>
      </aside>
      </div>
    </RequireAuth>
  );
}
