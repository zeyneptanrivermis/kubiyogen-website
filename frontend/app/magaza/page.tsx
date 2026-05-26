import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { getCourses, getProducts } from "@/lib/catalog-api";

const categories = [
  {
    title: "Yüz Yüze Eğitimler",
    href: "/magaza/yuz-yuze-egitimler",
    description: "Etkinlik kayıtlarından gelen tarihli ve ücretli eğitimler."
  },
  {
    title: "Dijital Eğitimler",
    href: "/magaza/dijital-egitimler",
    description: "Veritabanındaki kurs kayıtları dil ve kategori bilgisiyle listelenir."
  },
  {
    title: "Aksesuarlar",
    href: "/magaza/aksesuarlar",
    description: "Stok ve fiyat bilgisi backend ürün kayıtlarından gelir."
  }
];

export default async function ShopPage() {
  const [courses, products] = await Promise.all([getCourses(), getProducts()]);

  return (
    <main>
      <PageHero
        title="Mağaza"
        description="Yüz yüze eğitimler, dijital eğitimler ve aksesuarlar güncel backend kayıtlarıyla yönetilir."
      />
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article key={category.href} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">{category.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{category.description}</p>
              <p className="mt-5 text-sm font-semibold text-brand-700">
                {category.href.includes("dijital") ? `${courses.length} kurs` : category.href.includes("aksesuar") ? `${products.length} ürün` : "Etkinlik takvimi"}
              </p>
              <Link href={category.href} className="mt-6 inline-flex rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
                İncele
              </Link>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
