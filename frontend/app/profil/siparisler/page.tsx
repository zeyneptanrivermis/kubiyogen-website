import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { UserDataList } from "@/components/user-data-list";

export default function OrdersPage() {
  return (
    <main>
      <PageHero title="Siparislerim" description="Odeme durumu, toplam tutar ve erisim kodu takibi." />
      <section className="py-16">
        <Container>
          <UserDataList title="Siparislerim" path="/users/orders" />
        </Container>
      </section>
    </main>
  );
}
