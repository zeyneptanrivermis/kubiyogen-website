import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export default function PaymentFailedPage() {
  return (
    <main>
      <PageHero title="Odeme Basarisiz" description="Odeme tamamlanamadi. Siparis beklemede kalir ve tekrar denenebilir." />
      <section className="py-16">
        <Container className="max-w-2xl">
          <div className="rounded-lg border border-line bg-white p-6 text-center shadow-card">
            <p className="text-sm leading-7 text-slate-600">Kart reddi, zaman asimi veya PayTR dogrulama hatasi olusabilir.</p>
            <Link href="/odeme" className="mt-6 inline-flex rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white">
              Tekrar Dene
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
