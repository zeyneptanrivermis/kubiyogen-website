import { AdminSection } from "@/components/admin/admin-section";
import { ContentForm } from "@/components/admin/content-form";

export default function NewCoursePage() {
  return (
    <AdminSection title="Yeni kurs" description="Dijital/yuz yuze egitim icerigi ve yayin durumu.">
      <ContentForm type="course" />
    </AdminSection>
  );
}
