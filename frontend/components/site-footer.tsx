import Link from "next/link";
import { contactLinks, navigation } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "rgba(250, 245, 255, 0.4)",
        borderTop: "1px solid rgba(124, 58, 237, 0.12)"
      }}
      className="bg-white/80"
    >
      <div className="max-w-[1400px] mx-auto px-6 w-full py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            {/* Logo matches SiteHeader perfectly */}
            <Link
              href="/"
              className="text-base font-bold tracking-[0.28em] uppercase text-brand-800 hover:opacity-80 transition-all duration-200"
            >
              Kubiyogen
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Kariyer odaklı eğitimler, etkinlikler ve topluluk deneyimini bir araya getiren sade
              bir dijital deneyim.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7c3aed]">Menü</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#7c3aed] transition-colors duration-200 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7c3aed]">İletişim</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              <p className="text-slate-500">Telefon ve adres bilgileri buraya eklenecek.</p>
              {contactLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="hover:text-[#7c3aed] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
