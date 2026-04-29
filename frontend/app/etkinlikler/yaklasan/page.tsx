import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { upcomingEvents } from "@/lib/site-data";

export default function UpcomingEventsPage() {
  return (
    <main>
      <PageHero
        title="Yaklasan Etkinlikler"
        description="Her etkinlikte tarih, saat, egitmen, ucret, adet secimi ve sepete ekleme alanlari bulunacak."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              subtitle={event.date}
              body={`${event.location} - ${event.instructor}. Saat, icerik, hedef kitle ve kazanımlar icin detay alani.`}
              meta={`${event.price} - ${event.quota}`}
              ctaLabel="Sepete Ekle"
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
