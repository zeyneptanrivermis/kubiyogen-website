import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="Hakkimizda"
        description="Mevcut sitedeki kurum anlatimini daha sade basliklarla ve daha temiz bir metin hiyerarsisi ile yeniden kuracagiz."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-line bg-white p-8 shadow-card">
            <p className="text-base leading-8 text-slate-600">
              Bu sayfa mevcut Kubiyogen iceriginden sadeleştirilerek doldurulacak. Fazla semboller
              ve daginik basliklar temizlenip daha okunur bir anlatim kurulacak.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-soft p-8">
            <h2 className="text-xl font-semibold text-ink">Anlatim Yapisi</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <li>Kubiyogen kimdir?</li>
              <li>Ne amaclar?</li>
              <li>Katilimciya ne sunar?</li>
              <li>Egitim ve etkinlik yaklasimi nedir?</li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
