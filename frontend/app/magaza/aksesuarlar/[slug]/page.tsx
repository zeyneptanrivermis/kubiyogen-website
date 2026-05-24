import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { getProductBySlug, formatPrice } from "@/lib/catalog-api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-soft">
      <PageHero
        title={product.name}
        description="Kubiyogen Özel Tasarım Laboratuvar Aksesuarları"
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <article className="rounded-lg border border-line bg-white p-8 shadow-card">
              <h2 className="text-2xl font-bold text-ink">Ürün Özellikleri</h2>
              <div className="mt-6 text-base leading-8 text-slate-700 space-y-4">
                {product.description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="text-lg font-bold text-ink mb-4">Teslimat & İade Şartları</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                  <li>Siparişiniz 24-48 saat içerisinde özenle paketlenerek kargoya verilir.</li>
                  <li>Tüm Türkiye&apos;ye hızlı kargo seçeneği mevcuttur.</li>
                  <li>Kutusu açılmamış ve zarar görmemiş ürünler 14 gün içerisinde ücretsiz iade edilebilir.</li>
                  <li>Laboratuvar test tüpü standı ve rozetler özel korumalı ambalajında gönderilir.</li>
                </ul>
              </div>
            </article>

            <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide">Ürün Bilgileri</p>
              <div className="mt-4 space-y-4 text-sm font-semibold text-ink">
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Stok Durumu:</span>
                  <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0 ? `${product.stock} Adet Stokta` : "Tükendi"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Kategori:</span>
                  <span>Aksesuarlar</span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Kargo:</span>
                  <span className="text-green-600">Ücretsiz</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500 font-medium">Ürün Fiyatı:</span>
                  <span className="text-lg font-bold text-brand-800">{formatPrice(product.price)}</span>
                </div>
              </div>

              {product.stock > 0 ? (
                <div className="mt-6">
                  <AddToCartButton itemType="PRODUCT" itemId={product.id} />
                </div>
              ) : (
                <div className="mt-6 text-center rounded-lg bg-soft p-3 text-xs font-semibold text-slate-500 border border-line">
                  Bu ürün şu anda stokta bulunmamaktadır.
                </div>
              )}

              <Link
                href="/magaza/aksesuarlar"
                className="mt-4 block text-center text-xs font-bold text-slate-600 hover:text-brand-700"
              >
                ← Aksesuarlara Dön
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
