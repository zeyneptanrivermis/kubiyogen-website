import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProfilePanel } from "@/components/profile-panel";
import { StatusPanel } from "@/components/status-panel";

export default function ProfilePage() {
  return (
    <main>
      <PageHero title="Profil" description="Kullanici bilgileri, siparisler, kurslar ve kodlu erisimler icin merkez." />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ProfilePanel />
          <StatusPanel
            title="Hesap Akislari"
            items={[
              "Profil bilgileri GET/PATCH /api/users/profile ile baglanacak.",
              "Satinalinan kurslar GET /api/users/courses uzerinden listelenecek.",
              "Erisim kodlari odeme webhook sonrasi otomatik uretilecek.",
              "Avatar ve sifre degistirme yonetici bilgisi beklemeden hazir arayuze baglanabilir."
            ]}
          />
        </Container>
      </section>
    </main>
  );
}
