"use client";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { QuantitySelector } from "@/components/store/QuantitySelector";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, remove, update, total } = useCartStore();

  return (
    <main>
      <PageHero title="Sepet" description="Ürünlerinizi inceleyin ve ödemeye geçin." />
      <section className="py-16">
        <Container>
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-sm text-slate-500">
              Sepetiniz boş.{" "}
              <Link href="/magaza" className="text-brand-700 underline">
                Alışverişe başla
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-white p-6">
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <QuantitySelector
                        initialValue={item.quantity}
                        onChange={(q) => update(item.id, q)}
                      />
                      <span className="text-sm font-semibold text-ink">
                        {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-xs text-slate-400 hover:text-red-500"
                      >
                        Kaldır
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg border border-line bg-white p-6 h-fit">
                <h2 className="text-lg font-semibold text-ink">Sipariş Özeti</h2>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span>Ara Toplam</span>
                  <span>{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(total())}</span>
                </div>
                <div className="mt-2 flex items-center justify-between font-semibold text-ink">
                  <span>Toplam</span>
                  <span>{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(total())}</span>
                </div>
                <Link
                  href="/odeme"
                  className="mt-6 block w-full rounded-lg bg-brand-700 px-6 py-3 text-center text-sm font-semibold text-white"
                >
                  Ödemeye Geç
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
