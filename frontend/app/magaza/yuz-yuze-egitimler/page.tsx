import { Container } from "@/components/container";
import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { upcomingEvents } from "@/lib/site-data";

export default function InPersonTrainingsPage() {
  return (
    <main>
      <PageHero
        title="Yuz Yuze Uygulamali Egitimler"
        description="Bu bolumde tarih, egitmen, ucret, kontenjan ve sepete ekleme akisi ile listeleme yapilacak."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              subtitle={event.date}
              body={`${event.location} - ${event.instructor}. Program icerigi, kazanilacak beceriler ve uygulama akisinin ozet alanı.`}
              meta={`${event.price} - ${event.quota}`}
              ctaLabel="Sepete Ekle"
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
