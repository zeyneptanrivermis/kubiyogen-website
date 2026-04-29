import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/cards";
import { products } from "@/lib/site-data";

export default function AccessoriesPage() {
  return (
    <main>
      <PageHero
        title="Aksesuarlar"
        description="Urun bilgisi, fiyat, adet secimi ve sepete ekleme aksiyonu bu bolumde detaylanacak."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              category={product.category}
              price={product.price}
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
