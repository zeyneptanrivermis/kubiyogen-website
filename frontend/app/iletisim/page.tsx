import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { contactLinks } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Iletisim"
        description="Telefon, adres ve sosyal medya baglantilarinin net ve guven veren bir duzende sunulacagi sayfa."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-line bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Iletisim Bilgileri</h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <p>Telefon: Ekipten alinacak</p>
              <p>Adres: Ekipten alinacak</p>
              <p>E-posta: Ekipten alinacak</p>
            </div>
            <button className="mt-6 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
              WhatsApp ile Ulas
            </button>
          </div>

          <div className="rounded-lg border border-line bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Sosyal Medya</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600">
              {contactLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
