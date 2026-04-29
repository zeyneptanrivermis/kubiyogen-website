import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { pastEvents } from "@/lib/site-data";

export default function PastEventsPage() {
  return (
    <main>
      <PageHero
        title="Son Yapilan Etkinlikler"
        description="Gorseller, cikarimlar, katilimci yorumlari ve kazanilan becerilerin toplandigi sayfa yapisi."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              subtitle={event.date}
              body={event.summary}
              ctaLabel="Yorumlari Gor"
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
