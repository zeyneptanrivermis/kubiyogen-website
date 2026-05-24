import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export default function CheckoutPage() {
  return (
    <main>
      <PageHero title="Odeme" description="Siparis ozeti, kullanici bilgileri ve PayTR odeme hazirligi." />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <form className="rounded-lg border border-line bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Alici Bilgileri</h2>
            <input className="mt-5 w-full rounded-lg border border-line px-4 py-3" placeholder="Ad Soyad" />
            <input className="mt-4 w-full rounded-lg border border-line px-4 py-3" placeholder="Email" type="email" />
            <input className="mt-4 w-full rounded-lg border border-line px-4 py-3" placeholder="Telefon" />
            <Link href="/odeme/paytr" className="mt-6 inline-flex rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white">
              PayTR ile Devam Et
            </Link>
          </form>
          <aside className="rounded-lg border border-line bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Siparis Ozeti</h2>
            <div className="mt-5 border-t border-line pt-5 text-sm leading-7 text-slate-600">
              <p>Dijital egitim: 1.490 TL</p>
              <p>Kodlu erisim: satin alma sonrasi otomatik</p>
              <p className="mt-4 text-lg font-semibold text-ink">Toplam: 1.490 TL</p>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
