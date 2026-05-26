import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/cards";
import { formatPrice, getProducts } from "@/lib/catalog-api";

export default async function AccessoriesPage() {
  const products = await getProducts();

  return (
    <main>
      <PageHero
        title="Aksesuarlar"
        description="Ürün bilgisi, fiyat ve stok backend ürün kayıtlarından alınır."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              category={`Stok: ${product.stock}`}
              price={formatPrice(product.price)}
              body={product.description}
              slug={product.slug}
              detailUrlPrefix="/magaza/aksesuarlar"
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
