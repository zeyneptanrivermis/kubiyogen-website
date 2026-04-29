"use client";

import { useState } from "react";

export function FileInput({ label, accept }: { label: string; accept?: string }) {
  const [fileName, setFileName] = useState("Dosya secilmedi");

  return (
    <label className="block rounded-lg border border-dashed border-line bg-white p-4">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "Dosya secilmedi")}
      />
      <span className="mt-3 flex min-h-10 items-center justify-between gap-3 rounded-lg bg-soft px-3 py-2 text-sm text-slate-600">
        <span className="truncate">{fileName}</span>
        <span className="font-semibold text-brand-700">Sec</span>
      </span>
    </label>
  );
}
