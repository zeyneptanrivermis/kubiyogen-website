import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { formatDate, formatPrice, getUpcomingEvents } from "@/lib/catalog-api";

export default async function InPersonTrainingsPage() {
  const events = await getUpcomingEvents();

  return (
    <main>
      <PageHero
        title="Yüz Yüze Uygulamalı Eğitimler"
        description="Tarih, lokasyon, ücret ve kontenjan akışı backend etkinlik kayıtlarından beslenir."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              subtitle={formatDate(event.date)}
              body={event.description}
              meta={`${event.location} - ${formatPrice(event.price)}`}
              ctaLabel="Sepete Ekle"
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
