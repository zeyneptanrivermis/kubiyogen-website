import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

const languages = [
  {
    title: "Turkce Egitimler",
    description: "Turkce icerikli dijital egitimlerin kart yapisi burada listelenecek."
  },
  {
    title: "Ingilizce Egitimler",
    description: "Ingilizce egitimlerin ayri katalog mantigiyla sunulacagi alan."
  }
];

export default function DigitalTrainingsPage() {
  return (
    <main>
      <PageHero
        title="Dijital Egitimler"
        description="Dijital egitimler kendi icinde Turkce ve Ingilizce olarak iki ana basliga ayrilacak."
      />
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          {languages.map((language) => (
            <article key={language.title} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">{language.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{language.description}</p>
              <div className="mt-6 rounded-lg bg-soft p-4 text-sm leading-7 text-slate-600">
                Bu alanda egitim suresi, egitmen, altyazi dili ve satin alma modeli gosterilecek.
              </div>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
