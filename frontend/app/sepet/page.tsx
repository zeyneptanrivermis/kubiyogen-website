import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { CartCheckout } from "@/components/cart-checkout";

export default function CartPage() {
  return (
    <main>
      <PageHero
        title="Sepet"
        description="Secilen egitim, etkinlik ve aksesuarlar tek sipariste toplanir; odeme bilgileri onaydan sonra alinir."
      />
      <section className="py-16">
        <Container>
          <CartCheckout />
        </Container>
      </section>
    </main>
  );
}
