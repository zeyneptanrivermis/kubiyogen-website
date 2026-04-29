import { AdminSection } from "@/components/admin/admin-section";
import { ContentForm } from "@/components/admin/content-form";

export default function NewEventPage() {
  return (
    <AdminSection title="Yeni etkinlik" description="Baslik, tarih, ucret, gorsel ve detay icerigi girisi.">
      <ContentForm type="event" />
    </AdminSection>
  );
}
