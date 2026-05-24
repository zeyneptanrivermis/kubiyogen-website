"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest, clearToken } from "@/lib/api-client";

type Profile = {
  name?: string;
  email: string;
  phone?: string;
  role: string;
};

export function ProfilePanel() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("Profil yükleniyor.");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    apiRequest<Profile>("/users/profile").then((result) => {
      if (result.error || !result.data) {
        setMessage("Giriş yapılmadı veya token geçersiz.");
        return;
      }
      setProfile(result.data);
      setEditName(result.data.name ?? "");
      setEditPhone(result.data.phone ?? "");
      setMessage("");
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    const result = await apiRequest<Profile>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify({ name: editName, phone: editPhone })
    });
    setUpdateLoading(false);
    if (result.error || !result.data) {
      alert(result.error ?? "Profil güncellenemedi.");
      return;
    }
    setProfile(result.data);
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <aside className="rounded-lg border border-line bg-white p-6 shadow-card">
        <p className="text-sm leading-7 text-slate-600">{message}</p>
        <Link href="/giris" className="mt-5 inline-flex rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
          Giriş Yap
        </Link>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-line bg-white p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl">
          {(profile.name ?? profile.email)[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-bold text-ink">{profile.name ?? "Kubiyogen Üyesi"}</h2>
          <p className="text-xs text-slate-500 font-semibold uppercase">{profile.role}</p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="mt-6 grid gap-4 border-t border-line pt-6">
          <label className="text-xs font-semibold text-slate-600 uppercase">
            Ad Soyad
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink"
              required
            />
          </label>
          <label className="text-xs font-semibold text-slate-600 uppercase">
            Telefon Numarası
            <input
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink"
              placeholder="0555 555 55 55"
            />
          </label>
          <div className="mt-2 flex gap-2">
            <button
              type="submit"
              disabled={updateLoading}
              className="flex-1 rounded-lg bg-brand-700 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => {
                setEditName(profile.name ?? "");
                setEditPhone(profile.phone ?? "");
                setIsEditing(false);
              }}
              className="flex-1 rounded-lg border border-line py-2 text-sm font-semibold text-slate-700 hover:bg-soft"
            >
              İptal
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6 grid gap-2 border-t border-line pt-6 text-sm">
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase">E-posta</span>
            <span className="font-semibold text-ink">{profile.email}</span>
          </div>
          <div className="mt-2">
            <span className="block text-xs font-semibold text-slate-400 uppercase">Telefon</span>
            <span className="font-semibold text-ink">{profile.phone ?? "Girilmemiş"}</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 w-full rounded-lg border border-line py-2 text-xs font-bold text-brand-700 hover:bg-brand-50"
          >
            Profili Düzenle
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-3 text-sm font-semibold text-ink border-t border-line pt-6">
        <Link href="/profil/siparisler" className="rounded-lg border border-line px-4 py-3 hover:bg-soft">Siparişlerim</Link>
        <Link href="/profil/kurslarim" className="rounded-lg border border-line px-4 py-3 hover:bg-soft">Kurslarım</Link>
        <Link href="/icerik/DEMO-KOD-2026" className="rounded-lg border border-line px-4 py-3 hover:bg-soft">Kodlu İçerik</Link>
        <button onClick={() => { clearToken(); setProfile(null); setMessage("Çıkış yapıldı."); }} className="rounded-lg border border-line px-4 py-3 text-left hover:bg-soft text-red-600">
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
