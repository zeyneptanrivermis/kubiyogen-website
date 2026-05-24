"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { apiRequest, API_BASE_URL } from "@/lib/api-client";

type Field = {
  name: string;
  label: string;
  type?: string;
};

type AdminResourceManagerProps = {
  title: string;
  description: string;
  publicPath: string;
  adminPath: string;
  fields: readonly Field[];
};

type ListResponse = {
  items?: Array<Record<string, unknown>>;
};

export function AdminResourceManager({ title, description, publicPath, adminPath, fields }: AdminResourceManagerProps) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}${publicPath}`);
    const body = (await response.json()) as ListResponse | Array<Record<string, unknown>>;
    setItems(Array.isArray(body) ? body : body.items ?? []);
  }, [publicPath]);

  useEffect(() => {
    load().catch(() => setMessage("Liste alinamadi. Backend calisiyor mu kontrol edin."));
  }, [load]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      fields.map((field) => {
        const value = form.get(field.name);
        if (field.type === "number") return [field.name, Number(value)];
        if (field.type === "checkbox") return [field.name, value === "on"];
        if (field.type === "datetime-local") return [field.name, value ? new Date(String(value)).toISOString() : ""];
        return [field.name, String(value ?? "")];
      })
    );
    const result = await apiRequest<Record<string, unknown>>(adminPath, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (result.error) {
      setMessage(result.error);
      return;
    }
    setMessage("Kayit olusturuldu.");
    event.currentTarget.reset();
    await load();
  };

  const remove = async (id: unknown) => {
    if (typeof id !== "string") return;
    const result = await apiRequest(`${adminPath}/${id}`, { method: "DELETE" });
    setMessage(result.error ?? "Kayit silindi.");
    await load();
  };

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-line bg-white p-6 shadow-card">
        <p className="text-sm font-semibold text-brand-700">Admin</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
      <form onSubmit={submit} className="grid gap-4 rounded-lg border border-line bg-white p-6 shadow-card md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="text-sm font-semibold text-ink">
            {field.label}
            {field.type === "checkbox" ? (
              <input name={field.name} type="checkbox" className="mt-3 block h-5 w-5" />
            ) : (
              <input name={field.name} type={field.type ?? "text"} required className="mt-2 w-full rounded-lg border border-line px-4 py-3" />
            )}
          </label>
        ))}
        <button className="rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white md:col-span-2">Yeni Kayit Ekle</button>
      </form>
      {message ? <p className="rounded-lg bg-soft p-3 text-sm text-slate-700">{message}</p> : null}
      <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-soft text-ink">
            <tr>
              <th className="px-5 py-4">Baslik</th>
              <th className="px-5 py-4">Slug/ID</th>
              <th className="px-5 py-4">Fiyat</th>
              <th className="px-5 py-4">Islem</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item.id ?? item.slug)} className="border-t border-line">
                <td className="px-5 py-4 text-ink">{String(item.title ?? item.name ?? "-")}</td>
                <td className="px-5 py-4 text-slate-600">{String(item.slug ?? item.id ?? "-")}</td>
                <td className="px-5 py-4 text-slate-600">{String(item.price ?? "-")}</td>
                <td className="px-5 py-4">
                  <button type="button" onClick={() => remove(item.id)} className="rounded-lg border border-line px-3 py-2 font-semibold text-ink">
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
