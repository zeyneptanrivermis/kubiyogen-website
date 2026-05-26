"use client";

import { FormEvent, useState } from "react";
import { apiRequest, setToken } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthResponse = {
  token: string;
  user: { email: string };
};

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const criteria = [
    { label: "En az 8 karakter", met: password.length >= 8 },
    { label: "En az bir küçük harf", met: /[a-z]/.test(password) },
    { label: "En az bir büyük harf", met: /[A-Z]/.test(password) },
    { label: "En az bir rakam", met: /[0-9]/.test(password) },
    { label: "En az bir özel karakter (örn: @, #, $, %)", met: /[^A-Za-z0-9]/.test(password) }
  ];

  const metCount = criteria.filter((c) => c.met).length;

  const getStrengthTextAndColor = () => {
    if (!password) return { text: "", colorClass: "bg-slate-200", textClass: "text-slate-400" };
    if (metCount <= 2) return { text: "Zayıf (En az 'Orta' olmalı)", colorClass: "bg-red-500", textClass: "text-red-500" };
    if (metCount === 3) return { text: "Orta", colorClass: "bg-amber-500", textClass: "text-amber-500" };
    return { text: "Güçlü", colorClass: "bg-emerald-500", textClass: "text-emerald-600" };
  };

  const { text: strengthText, colorClass: strengthColor, textClass: strengthTextColor } = getStrengthTextAndColor();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");

    if (mode === "register") {
      const name = String(form.get("name") ?? "");
      const phone = String(form.get("phone") ?? "");

      if (metCount <= 2) {
        setMessage("Lütfen daha güçlü bir şifre belirleyin.");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Şifreler eşleşmiyor.");
        setLoading(false);
        return;
      }

      if (phone.replace(/\D/g, "").length < 10) {
        setMessage("Lütfen geçerli bir telefon numarası girin.");
        setLoading(false);
        return;
      }

      const result = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, phone })
      });
      setLoading(false);
      if (result.error || !result.data) {
        setMessage(result.error ?? "İşlem tamamlanamadı");
        return;
      }
      setToken(result.data.token);
      router.push("/profil");
      router.refresh();
    } else {
      const result = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      setLoading(false);
      if (result.error || !result.data) {
        setMessage(result.error ?? "İşlem tamamlanamadı");
        return;
      }
      setToken(result.data.token);
      router.push("/profil");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/15 p-8 shadow-2xl backdrop-blur-xl"
    >
      {/* Decorative neon purple glow in the top-left corner */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none" />

      <div className="mb-8 text-center relative z-10">
        <h2 className="text-3xl font-extrabold text-ink tracking-tight">
          {mode === "login" ? "Hoş Geldiniz" : "Hesap Oluştur"}
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          {mode === "login" ? "Hesabınıza giriş yapın" : "Hızlıca yeni bir profil oluşturun"}
        </p>
      </div>

      <div className="space-y-5 relative z-10">
        {mode === "register" ? (
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2" htmlFor="name">
              Ad Soyad
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full bg-white/70 border border-slate-200 text-ink rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 focus:outline-none text-sm transition-all shadow-sm"
              placeholder="Adınızı ve soyadınızı girin"
            />
          </div>
        ) : null}

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2" htmlFor="email">
            E-posta Adresi
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-white/70 border border-slate-200 text-ink rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 focus:outline-none text-sm transition-all shadow-sm"
            placeholder="örnek@gmail.com"
          />
        </div>

        {mode === "register" ? (
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2" htmlFor="phone">
              Telefon Numarası
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="0555 555 55 55"
              className="w-full bg-white/70 border border-slate-200 text-ink rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 focus:outline-none text-sm transition-all shadow-sm"
            />
          </div>
        ) : null}

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2" htmlFor="password">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/70 border border-slate-200 text-ink rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 focus:outline-none text-sm transition-all shadow-sm"
            placeholder="••••••••"
          />
        </div>

        {mode === "register" && password ? (
          <div className="rounded-lg bg-slate-50/80 p-4 border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">Şifre Gücü:</span>
              <span className={strengthTextColor}>{strengthText}</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden flex">
              <div
                className={`h-full transition-all duration-300 ${strengthColor}`}
                style={{ width: `${(metCount / 5) * 100}%` }}
              />
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
              {criteria.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={c.met ? "text-emerald-600 font-bold text-sm" : "text-slate-300"}>
                    {c.met ? "✓" : "○"}
                  </span>
                  <span className={c.met ? "text-slate-800 font-medium" : "text-slate-400"}>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {mode === "register" ? (
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2" htmlFor="confirmPassword">
              Şifre Tekrar
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-white/70 border border-slate-200 text-ink rounded-lg px-4 py-3 placeholder:text-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 focus:outline-none text-sm transition-all shadow-sm"
              placeholder="••••••••"
            />
            {confirmPassword && (
              <p className={`mt-2 text-xs font-bold ${password === confirmPassword ? "text-emerald-600" : "text-red-500"}`}>
                {password === confirmPassword ? "✓ Şifreler eşleşiyor" : "✗ Şifreler eşleşmiyor"}
              </p>
            )}
          </div>
        ) : null}
      </div>

      <button
        disabled={loading || (mode === "register" && (metCount <= 2 || password !== confirmPassword))}
        className="mt-8 w-full rounded-lg bg-brand-700 hover:bg-brand-800 py-3.5 px-4 font-bold text-white transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-sm relative z-10"
      >
        {loading ? "İşleniyor..." : mode === "register" ? "Hesap Oluştur" : "Giriş Yap"}
      </button>

      {message ? (
        <p className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-semibold text-center relative z-10">
          {message}
        </p>
      ) : null}

      <div className="mt-6 text-center text-xs text-slate-500 font-medium relative z-10">
        {mode === "login" ? (
          <>
            Hesabınız yok mu?
            <Link href="/kayit" className="font-bold text-brand-700 hover:underline ml-1">
              Kayıt Olun
            </Link>
          </>
        ) : (
          <>
            Zaten üye misiniz?
            <Link href="/giris" className="font-bold text-brand-700 hover:underline ml-1">
              Giriş Yapın
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
