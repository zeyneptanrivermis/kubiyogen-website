import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export default function PaymentSuccessPage() {
  return (
    <main>
      <PageHero title="Odeme Basarili" description="Siparis tamamlandi ve dijital egitim icin erisim kodu olusturuldu." />
      <section className="py-16">
        <Container className="max-w-2xl">
          <div className="rounded-lg border border-line bg-white p-6 text-center shadow-card">
            <p className="text-sm font-semibold text-brand-700">Erisim Kodu</p>
            <p className="mt-3 rounded-lg bg-soft px-4 py-4 text-xl font-bold text-ink">KBY-DEMO-2026</p>
            <Link href="/icerik/KBY-DEMO-2026" className="mt-6 inline-flex rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white">
              Icerige Git
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
