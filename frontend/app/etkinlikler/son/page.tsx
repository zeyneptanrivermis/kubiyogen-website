import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { formatDate, getRecentEvents } from "@/lib/catalog-api";

export default async function PastEventsPage() {
  const recentEvents = await getRecentEvents();

  return (
    <main>
      <PageHero
        title="Son Yapılan Etkinlikler"
        description="Görseller, çıkarımlar, katılımcı yorumları ve kazanılan beceriler için geçmiş etkinlik kayıtları."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {recentEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              subtitle={formatDate(event.date)}
              body={event.description}
              ctaLabel="Yorumları Gör"
              slug={event.slug}
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
