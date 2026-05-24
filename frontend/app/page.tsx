import Link from "next/link";
import { Container } from "@/components/container";
import { EventCard, ProductCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { shopCategories } from "@/lib/site-data";
import { formatDate, formatPrice, getProducts, getRecentEvents, getUpcomingEvents } from "@/lib/catalog-api";

export default async function HomePage() {
  const [upcomingEvents, recentEvents, products] = await Promise.all([
    getUpcomingEvents(),
    getRecentEvents(),
    getProducts()
  ]);
  const visibleUpcoming = upcomingEvents.slice(0, 3);
  const visibleRecent = recentEvents.slice(0, 3);
  const visibleProducts = products.slice(0, 3);

  return (
    <main>
      <Hero />

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Yaklaşan Etkinlikler"
            title="Takvimde öne çıkan buluşmalar"
            description="Veritabanındaki en yakın etkinlikler ana sayfada öne çıkarılır."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {visibleUpcoming.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                subtitle={formatDate(event.date)}
                body={event.description}
                meta={`${event.location} - ${formatPrice(event.price)}`}
                ctaLabel="Etkinliği İncele"
                slug={event.slug}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="Son Yapılan Etkinlikler"
            title="Topluluğun yeni deneyimleri"
            description="Veritabanında geçmiş olarak işaretlenen etkinliklerin özeti."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {visibleRecent.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                subtitle={formatDate(event.date)}
                body={event.description}
                ctaLabel="Etkinlik Notları"
                slug={event.slug}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-soft py-16">
        <Container>
          <SectionHeading
            eyebrow="Mağaza"
            title="Üç temel kategoriyle sade bir alışveriş kurgusu"
            description="Yüz yüze eğitimler, dijital eğitimler ve aksesuarlar ana giriş kartları olarak sunulur."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {shopCategories.map((category) => (
              <article key={category.title} className="rounded-lg border border-line bg-white p-6 shadow-card">
                <h3 className="text-xl font-semibold text-ink">{category.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{category.description}</p>
                <button className="mt-6 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                  Kategoriye Git
                </button>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Aksesuarlar"
            title="Öne çıkan ürünler"
            description="Veritabanındaki aksesuar ürünlerinden ilk üç kayıt gösterilir."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                category="Aksesuar"
                price={formatPrice(product.price)}
                body={product.description}
                slug={product.slug}
                detailUrlPrefix="/magaza/aksesuarlar"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-900 py-16 text-white">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">Kisa Mesaj</p>
            <h2 className="mt-3 text-3xl font-bold">Kariyer yolculugunu Kubiyogen ile sekillendir.</h2>
            <p className="mt-4 text-base leading-8 text-brand-100">
              Bu alan motivasyon, topluluk dili ya da kisa kurum mesaji icin kullanilacak.
            </p>
          </div>
          <Link
            href="/hakkimizda"
            className="inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-900"
          >
            Kubiyogen Hakkinda
          </Link>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-line bg-white p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Bu sprintte odak
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">Frontend tarafinda sonraki adimlar</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <li>Gercek gorseller ve kurumsal logo eklenmesi</li>
              <li>Etkinlik ve egitim detay sayfalari</li>
              <li>Sepet durum yonetimi ve API baglantisi</li>
              <li>WhatsApp ve chatbot aksiyonlarinin gercek linklerle tamamlanmasi</li>
            </ul>
          </div>

          <div className="rounded-lg border border-line bg-soft p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Icerik ihtiyaclari
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">Ekipten alinacak bilgiler</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <li>Gercek etkinlik tarihleri, egitmenler ve fiyatlar</li>
              <li>Hakkimizda metninin sadeleştirilmis son hali</li>
              <li>Iletisim adresleri ve sosyal medya linkleri</li>
              <li>Urun gorselleri ve stok bilgileri</li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
