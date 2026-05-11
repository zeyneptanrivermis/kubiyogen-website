"use client";

import { useState } from "react";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end gap-3">
      {open ? (
        <div className="w-72 rounded-lg border border-line bg-white p-4 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-ink">Kubiyogen Asistan</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Eğitim, etkinlik ve sipariş soruları için hazır.</p>
            </div>
            <button className="text-sm font-bold text-slate-500" onClick={() => setOpen(false)} type="button" aria-label="Chatbot kapat">
              x
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="rounded-lg bg-soft p-3 text-slate-700">Merhaba, nasıl yardımcı olabiliriz?</div>
            <button className="w-full rounded-lg border border-line px-3 py-2 text-left font-semibold text-brand-800" type="button">
              Yaklaşan etkinlikleri sor
            </button>
            <button className="w-full rounded-lg border border-line px-3 py-2 text-left font-semibold text-brand-800" type="button">
              Siparis durumunu sor
            </button>
          </div>
        </div>
      ) : null}
      <button
        className="rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-ink shadow-card transition hover:bg-soft"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        Chatbot
      </button>
    </div>
  );
}
