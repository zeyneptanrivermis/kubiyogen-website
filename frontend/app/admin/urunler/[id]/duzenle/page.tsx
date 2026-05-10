import { AdminSection } from "@/components/admin/admin-section";
import { ContentForm } from "@/components/admin/content-form";

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <AdminSection title="Urun duzenle" description={`${params.id} kaydi icin stok, fiyat, gorsel ve yayin durumu guncelleme.`}>
      <ContentForm type="product" />
    </AdminSection>
  );
}
