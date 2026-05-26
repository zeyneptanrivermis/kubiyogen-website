"use client";

import { FormEvent, useState } from "react";
import { apiRequest } from "@/lib/api-client";

type TokenPayload = {
  tokenPayload: Record<string, unknown>;
};

export function PaymentFlow() {
  const [message, setMessage] = useState("");
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await apiRequest<TokenPayload>("/payment/paytr/token", {
      method: "POST",
      body: JSON.stringify({
        orderId: String(form.get("orderId") ?? ""),
        successUrl: `${window.location.origin}/odeme/basarili`,
        failUrl: `${window.location.origin}/odeme/basarisiz`
      })
    });
    if (result.error || !result.data) {
      setPayload(null);
      setMessage(result.error ?? "PayTR token alinamadi. PayTR bilgileri girilmis mi kontrol edin.");
      return;
    }
    setPayload(result.data.tokenPayload);
    setMessage("PayTR token payload hazir.");
  };

  return (
    <div className="rounded-lg border border-line bg-white p-6 shadow-card">
      <h2 className="text-xl font-semibold text-ink">PayTR Token Hazirla</h2>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <input name="orderId" required placeholder="Siparis ID" className="rounded-lg border border-line px-4 py-3" />
        <button className="rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white">Token Olustur</button>
      </form>
      {message ? <p className="mt-4 rounded-lg bg-soft p-3 text-sm text-slate-700">{message}</p> : null}
      {payload ? <pre className="mt-4 overflow-auto rounded-lg bg-soft p-4 text-xs">{JSON.stringify(payload, null, 2)}</pre> : null}
    </div>
  );
}
