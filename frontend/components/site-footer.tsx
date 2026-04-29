import Link from "next/link";
import { contactLinks, navigation } from "@/lib/site-data";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h3 className="text-lg font-semibold text-ink">Kubiyogen</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Kariyer odakli egitimler, etkinlikler ve topluluk deneyimini bir araya getiren sade
            bir dijital deneyim.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-700">Menu</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-700">Iletisim</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <p>Telefon ve adres bilgileri buraya eklenecek.</p>
            {contactLinks.map((link) => (
              <Link key={link.label} href={link.href} target="_blank">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
