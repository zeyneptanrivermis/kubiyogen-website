import Link from "next/link";
import { Container } from "@/components/container";
import { EventCard, ProductCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { pastEvents, products, shopCategories, upcomingEvents } from "@/lib/site-data";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Yaklasan Etkinlikler"
            title="Takvimde one cikan bulusmalar"
            description="Ana sayfada en fazla uc etkinligi net kartlarla gosterecek bir alan."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.title}
                title={event.title}
                subtitle={event.date}
                body={`${event.location} - ${event.instructor}. Katilimciya net bir program akisi, uygulama alani ve soru-cevap zamani sunulacak.`}
                meta={`${event.price} - ${event.quota}`}
                ctaLabel="Etkinligi Incele"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="Son Yapilan Etkinlikler"
            title="Toplulugun yeni deneyimleri"
            description="Etkinlik ozeti, ogrenimler ve ciktilar icin kullanilacak bolum."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard
                key={event.title}
                title={event.title}
                subtitle={event.date}
                body={event.summary}
                ctaLabel="Etkinlik Notlari"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-soft py-16">
        <Container>
          <SectionHeading
            eyebrow="Magaza"
            title="Uc temel kategoriyle sade bir alisveris kurgusu"
            description="Yuz yuze egitimler, dijital egitimler ve aksesuarlar ana giris kartlari olarak sunulacak."
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
            title="One cikan urunler"
            description="Ana sayfada en fazla uc aksesuar urunu gosterilecek alan."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.title}
                title={product.title}
                category={product.category}
                price={product.price}
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
