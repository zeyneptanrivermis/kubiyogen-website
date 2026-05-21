import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pastEvents, upcomingEvents } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default function EventDetailPage({ params }: Props) {
    const allEvents = [...upcomingEvents, ...pastEvents];
    const event = allEvents.find(
        (e) => e.title.toLocaleLowerCase().replace(/\s/g, "-") === params.slug
    );
    if (!event) return notFound();

     return (
    <main>
      <PageHero title={event.title} description={event.date} />
      <section className="py-16">
        <Container className="max-w-2xl">
          <p className="text-sm text-slate-500">{event.date}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">{event.title}</h1>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            {"location" in event && event.location && (
            <p><span className="font-medium">Konum:</span> {event.location}</p>
            )}
            {"instructor" in event && event.instructor && (
            <p><span className="font-medium">Eğitmen:</span> {event.instructor}</p>
            )}
            {"quota" in event && event.quota && (
            <p><span className="font-medium">Kontenjan:</span> {event.quota}</p>
            )}
          </div>
          {"price" in event && event.price && (
            <div className="mt-8 flex items-center gap-4">
                <span className="text-2xl font-bold text-ink">{event.price}</span>
                <button className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
                Sepete Ekle
                </button>
            </div>
            )}

        </Container>
      </section>
    </main>
  );
}


