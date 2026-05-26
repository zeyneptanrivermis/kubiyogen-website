import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { formatDate, formatPrice, getRecentEvents, getUpcomingEvents } from "@/lib/catalog-api";

export default async function EventsPage() {
  const [upcomingEvents, recentEvents] = await Promise.all([getUpcomingEvents(), getRecentEvents()]);

  return (
    <main>
      <PageHero
        title="Etkinlikler"
        description="Yaklaşan ve son yapılan etkinlikler veritabanından alınan güncel kayıtlarla listelenir."
      />
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-ink">Yaklaşan Etkinlikler</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                subtitle={formatDate(event.date)}
                body={event.description}
                meta={`${event.location} - ${formatPrice(event.price)}`}
                ctaLabel="Bilet Al"
                slug={event.slug}
              />
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-semibold text-ink">Son Yapılan Etkinlikler</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {recentEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                subtitle={formatDate(event.date)}
                body={event.description}
                ctaLabel="Çıktıları İncele"
                slug={event.slug}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
