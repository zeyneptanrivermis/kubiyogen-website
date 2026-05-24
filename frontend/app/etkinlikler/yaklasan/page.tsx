import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { formatDate, formatPrice, getUpcomingEvents } from "@/lib/catalog-api";

export default async function UpcomingEventsPage() {
  const upcomingEvents = await getUpcomingEvents();

  return (
    <main>
      <PageHero
        title="Yaklaşan Etkinlikler"
        description="Her etkinlikte tarih, lokasyon, ücret ve sepete ekleme akışı için güncel veriler kullanılır."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              subtitle={formatDate(event.date)}
              body={event.description}
              meta={`${event.location} - ${formatPrice(event.price)}`}
              ctaLabel="Sepete Ekle"
              slug={event.slug}
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
