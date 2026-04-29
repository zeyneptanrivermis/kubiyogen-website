import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { pastEvents, upcomingEvents } from "@/lib/site-data";

export default function EventsPage() {
  return (
    <main>
      <PageHero
        title="Etkinlikler"
        description="Yaklasan ve son yapilan etkinlikler icin iki ayrik ama birbiriyle tutarli icerik akisi kurulacak."
      />
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-ink">Yaklasan Etkinlikler</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.title}
                title={event.title}
                subtitle={event.date}
                body={`${event.location} - ${event.instructor}. Etkinlik akisi, icerik basliklari ve katilimciya katkisi burada ozetlenecek.`}
                meta={`${event.price} - ${event.quota}`}
                ctaLabel="Bilet Al"
              />
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-semibold text-ink">Son Yapilan Etkinlikler</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard
                key={event.title}
                title={event.title}
                subtitle={event.date}
                body={event.summary}
                ctaLabel="Ciktilari Incele"
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
