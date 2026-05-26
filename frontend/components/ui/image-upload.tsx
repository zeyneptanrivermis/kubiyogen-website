"use client";

import { ChangeEvent, useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ImageUpload({ label = "Gorsel Yukle" }: { label?: string }) {
  const [fileName, setFileName] = useState("PNG, JPG veya WEBP");
  const [progress, setProgress] = useState(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? "PNG, JPG veya WEBP");
    setProgress(file ? 72 : 0);
  }

  return (
    <div className="rounded-lg border border-dashed border-line bg-white p-4">
      <label className="block cursor-pointer">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <input type="file" accept="image/*" className="sr-only" onChange={handleChange} />
        <span className="mt-3 flex min-h-28 items-center justify-center rounded-lg bg-soft px-4 text-center text-sm text-slate-500">
          {fileName}
        </span>
      </label>
      <div className="mt-4">
        <ProgressBar value={progress} label="Cloudinary hazirlik" />
      </div>
    </div>
  );
}
