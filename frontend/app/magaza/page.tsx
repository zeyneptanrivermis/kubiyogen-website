import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { shopCategories } from "@/lib/site-data";

export default function ShopPage() {
  return (
    <main>
      <PageHero
        title="Magaza"
        description="Magaza altinda yuz yuze egitimler, dijital egitimler ve aksesuarlar icin ayri akislara gidilecek."
      />
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {shopCategories.map((category) => (
            <article key={category.title} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">{category.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{category.description}</p>
              <div className="mt-6 flex gap-3">
                <button className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
                  Incele
                </button>
                <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                  Karsilastir
                </button>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
