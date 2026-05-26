import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PaymentFlow } from "@/components/payment-flow";

export default function PaytrPage() {
  return (
    <main>
      <PageHero title="PayTR Odeme" description="Canli anahtarlar girildiginde PayTR iframe bu alanda acilacak." />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <PaymentFlow />
          <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center shadow-card">
            <p className="text-sm leading-7 text-slate-600">
              PAYTR_MERCHANT_ID, PAYTR_MERCHANT_KEY ve PAYTR_MERCHANT_SALT alindiginda backend token endpointi
              bu sayfaya iframe tokeni dondurecek.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/odeme/basarili" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
                Basarili Demo
              </Link>
              <Link href="/odeme/basarisiz" className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                Basarisiz Demo
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
