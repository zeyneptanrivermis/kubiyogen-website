import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { QuantitySelector } from "@/components/store/QuantitySelector";
import { products } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const product = products.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );
  return {
    title: product ? `${product.title} | Kubiyogen` : "Ürün Bulunamadı",
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!product) return notFound();

  return (
    <main>
      <PageHero title={product.title} description={product.category} />
      <section className="py-16">
        <Container className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-700">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">{product.title}</h1>
          <p className="mt-4 text-sm text-slate-600">
            Ürün açıklaması, kullanım alanları ve teknik detaylar burada yer alacak.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="text-2xl font-bold text-ink">{product.price}</span>
            <QuantitySelector />
            <button className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
              Sepete Ekle
            </button>
          </div>
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="text-xl font-semibold text-ink">Yorumlar</h2>
            <p className="mt-4 text-sm text-slate-500">
              Henüz yorum yapılmamış. İlk yorumu sen yap.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
