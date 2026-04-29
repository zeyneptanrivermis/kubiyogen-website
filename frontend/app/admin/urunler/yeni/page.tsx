import { AdminSection } from "@/components/admin/admin-section";
import { ContentForm } from "@/components/admin/content-form";

export default function NewProductPage() {
  return (
    <AdminSection title="Yeni urun" description="Aksesuar bilgileri, stok, gorsel ve yayin durumu.">
      <ContentForm type="product" />
    </AdminSection>
  );
}
