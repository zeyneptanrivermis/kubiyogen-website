"use client";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clear } = useCartStore();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clear();
    router.push("/");
  }

  return (
    <main>
      <PageHero title="Ödeme" description="Sipariş bilgilerinizi girin." />
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-ink">Kişisel Bilgiler</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">Ad</label>
                  <input
                    required
                    className="w-full rounded-lg border border-line px-4 py-2 text-sm text-ink outline-none focus:border-brand-700"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">Soyad</label>
                  <input
                    required
                    className="w-full rounded-lg border border-line px-4 py-2 text-sm text-ink outline-none focus:border-brand-700"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">E-posta</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg border border-line px-4 py-2 text-sm text-ink outline-none focus:border-brand-700"
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">Telefon</label>
                <input
                  required
                  type="tel"
                  className="w-full rounded-lg border border-line px-4 py-2 text-sm text-ink outline-none focus:border-brand-700"
                  placeholder="05xx xxx xx xx"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white"
              >
                Siparişi Tamamla
              </button>
            </form>

            <div className="rounded-lg border border-line bg-white p-6 h-fit">
              <h2 className="text-lg font-semibold text-ink">Sipariş Özeti</h2>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm text-slate-600">
                    <span>{item.title} x{item.quantity}</span>
                    <span>
                      {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4 font-semibold text-ink">
                <span>Toplam</span>
                <span>{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(total())}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
