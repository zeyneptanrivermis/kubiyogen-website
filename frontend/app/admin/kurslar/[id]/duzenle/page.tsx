import { AdminSection } from "@/components/admin/admin-section";
import { ContentForm } from "@/components/admin/content-form";

export default function EditCoursePage({ params }: { params: { id: string } }) {
  return (
    <AdminSection title="Kurs duzenle" description={`${params.id} kaydi icin mufredat, kategori, fiyat ve dil bilgisi guncelleme.`}>
      <ContentForm type="course" />
    </AdminSection>
  );
}
