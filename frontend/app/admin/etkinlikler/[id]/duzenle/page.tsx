import { AdminSection } from "@/components/admin/admin-section";
import { ContentForm } from "@/components/admin/content-form";

export default function EditEventPage({ params }: { params: { id: string } }) {
  return (
    <AdminSection title="Etkinlik duzenle" description={`${params.id} kaydi icin yayin, gorsel, tarih ve detay icerigi guncelleme.`}>
      <ContentForm type="event" />
    </AdminSection>
  );
}
