"use client";

import { useState } from "react";

type RichEditorProps = {
  label: string;
  value?: string;
  placeholder?: string;
};

export function RichEditor({ label, value = "", placeholder = "Icerik metni yazin" }: RichEditorProps) {
  const [content, setContent] = useState(value);

  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-2 overflow-hidden rounded-lg border border-line bg-white">
        <div className="flex flex-wrap gap-1 border-b border-line bg-soft p-2">
          {["B", "I", "H2", "Liste", "Link"].map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-semibold text-slate-700"
            >
              {item}
            </button>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={placeholder}
          className="min-h-40 w-full resize-y border-0 bg-white px-3 py-3 text-sm leading-7 text-ink outline-none placeholder:text-slate-400"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">Tiptap entegrasyonu icin hazir editor alani.</p>
    </label>
  );
}
