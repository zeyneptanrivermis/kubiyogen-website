"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";

type UserDataListProps = {
  title: string;
  path: string;
};

export function UserDataList({ title, path }: UserDataListProps) {
  const [items, setItems] = useState<unknown[]>([]);
  const [message, setMessage] = useState("Yukleniyor.");

  useEffect(() => {
    apiRequest<unknown[]>(path).then((result) => {
      if (result.error || !result.data) {
        setMessage(result.error ?? "Veri alinamadi.");
        return;
      }
      setItems(result.data);
      setMessage("");
    });
  }, [path]);

  return (
    <section className="grid gap-4">
      <h2 className="sr-only">{title}</h2>
      {message ? <p className="rounded-lg border border-line bg-white p-5 text-sm text-slate-600 shadow-card">{message}</p> : null}
      {items.map((item, index) => (
        <article key={index} className="rounded-lg border border-line bg-white p-5 shadow-card">
          <pre className="whitespace-pre-wrap text-xs leading-6 text-slate-700">{JSON.stringify(item, null, 2)}</pre>
        </article>
      ))}
      {!message && items.length === 0 ? (
        <p className="rounded-lg border border-line bg-white p-5 text-sm text-slate-600 shadow-card">Kayit bulunamadi.</p>
      ) : null}
    </section>
  );
}
