"use client";

import { FormEvent, useState } from "react";
import { apiRequest } from "@/lib/api-client";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    
    const form = new FormData(event.currentTarget);
    const result = await apiRequest("/contact", {
      method: "POST",
      body: JSON.stringify({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        subject: String(form.get("subject") ?? "Genel Sorular"),
        message: String(form.get("message") ?? "")
      })
    });
    
    setLoading(false);
    setMessage(result.error ?? "Mesajınız alındı. En kısa sürede geri dönüş sağlayacağız.");
    if (!result.error) event.currentTarget.reset();
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
    >
      <h2 className="text-base font-bold text-slate-800 border-l-4 border-[#7c3aed] pl-3 mb-6">Bize Mesaj Gönderin</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
          Ad Soyad
          <input
            name="name"
            required
            placeholder="İsminizi giriniz"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/5"
          />
        </label>
        
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
          E-posta
          <input
            name="email"
            type="email"
            required
            placeholder="ornek@mail.com"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/5"
          />
        </label>
      </div>

      <label className="mt-4 block text-xs font-bold text-slate-500 uppercase tracking-wider">
        Konu
        <select
          name="subject"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/5 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: "right 1rem center",
            backgroundSize: "1.25rem",
            backgroundRepeat: "no-repeat"
          }}
        >
          <option>Genel Sorular</option>
          <option>İş Birliği Talebi</option>
          <option>Eğitimler Hakkında</option>
          <option>Diğer</option>
        </select>
      </label>

      <label className="mt-4 block text-xs font-bold text-slate-500 uppercase tracking-wider">
        Mesajınız
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Mesajınızı buraya yazınız..."
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/5 resize-none"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-[#5000ca] hover:bg-[#4000a2] active:scale-[0.99] text-white py-3.5 text-sm font-bold transition-all duration-200 shadow-md disabled:opacity-50"
      >
        {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>

      {message ? (
        <div className="mt-4 rounded-xl bg-purple-50 border border-purple-100 p-4 text-xs font-medium text-purple-700 leading-relaxed">
          {message}
        </div>
      ) : null}
    </form>
  );
}
