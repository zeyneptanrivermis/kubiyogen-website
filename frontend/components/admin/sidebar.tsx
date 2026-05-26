import Link from "next/link";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Etkinlikler", href: "/admin/etkinlikler" },
  { label: "Kurslar", href: "/admin/kurslar" },
  { label: "Urunler", href: "/admin/urunler" },
  { label: "Siparisler", href: "/admin/siparisler" },
  { label: "Kullanicilar", href: "/admin/kullanicilar" }
];

export function Sidebar() {
  return (
    <aside className="border-b border-line bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="px-5 py-5">
        <Link href="/admin" className="block text-xl font-bold text-brand-800">
          Kubiyogen Admin
        </Link>
        <p className="mt-1 text-xs font-medium text-slate-500">Icerik ve operasyon paneli</p>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-4 lg:flex-col lg:px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-soft hover:text-brand-800"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
