"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";

type AdminApiTableProps = {
  title: string;
  description: string;
  path: string;
  columns: readonly {
    label: string;
    get: (item: Record<string, unknown>) => string;
  }[];
};

export function AdminApiTable({ title, description, path, columns }: AdminApiTableProps) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [message, setMessage] = useState("Yükleniyor.");

  useEffect(() => {
    apiRequest<Array<Record<string, unknown>>>(path).then((result) => {
      if (result.error || !result.data) {
        setMessage(result.error ?? "Veri alınamadı.");
        return;
      }
      setItems(result.data);
      setMessage("");
    });
  }, [path]);

  return (
    <section className="rounded-lg border border-line bg-white shadow-card">
      <div className="border-b border-line p-6">
        <p className="text-sm font-semibold text-brand-700">Admin</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {message ? <p className="p-6 text-sm text-slate-600">{message}</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-soft text-ink">
            <tr>
              {columns.map((column) => (
                <th key={column.label} className="px-5 py-4 font-semibold">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={String(item.id ?? index)} className="border-t border-line">
                {columns.map((column) => (
                  <td key={column.label} className="px-5 py-4 text-slate-600">{column.get(item)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
