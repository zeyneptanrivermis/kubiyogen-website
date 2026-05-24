import { AdminResourceManager } from "@/components/admin-resource-manager";

export default function AdminCoursesPage() {
  return (
    <AdminResourceManager
      title="Kurslar"
      description="Dijital ve yuz yuze egitimlerin dil, kategori, fiyat ve kodlu erisim ayarlari."
      publicPath="/courses"
      adminPath="/admin/courses"
      fields={[
        { name: "title", label: "Baslik" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Aciklama" },
        { name: "price", label: "Fiyat", type: "number" },
        { name: "category", label: "Kategori" },
        { name: "language", label: "Dil" }
      ]}
    />
  );
}
