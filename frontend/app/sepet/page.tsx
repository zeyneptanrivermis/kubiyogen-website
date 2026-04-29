import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export default function CartPage() {
  return (
    <main>
      <PageHero
        title="Sepet"
        description="Egitim, etkinlik ve aksesuar urunlerinin ortak sepet deneyimi bu sayfada kurgulanacak."
      />
      <section className="py-16">
        <Container>
          <div className="rounded-lg border border-dashed border-line bg-white p-8 text-sm leading-7 text-slate-600">
            Sepet akisi henuz canli verilere baglanmadi. Ilk asamada birlestirilmis urun listesi,
            adet kontrolleri ve odeme yonlendirmesi burada toplanacak.
          </div>
        </Container>
      </section>
    </main>
  );
}
