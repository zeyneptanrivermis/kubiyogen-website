import Link from "next/link";
import { adminSections } from "@/lib/site-data";

const stats = [
  { label: "Toplam Satis", value: "0 TL" },
  { label: "Siparis", value: "0" },
  { label: "Aktif Kullanici", value: "0" },
  { label: "Kodlu Erisim", value: "Hazir" }
];

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-lg border border-line bg-white p-5 shadow-card">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-ink">{stat.value}</p>
          </article>
        ))}
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {adminSections.map((section) => (
          <Link key={section.href} href={section.href} className="rounded-lg border border-line bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-brand-700">{section.metric}</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
