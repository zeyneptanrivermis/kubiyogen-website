import { AdminResourceManager } from "@/components/admin-resource-manager";

export default function AdminProductsPage() {
  return (
    <AdminResourceManager
      title="Urunler"
      description="Aksesuar fiyat, stok, gorsel ve yayinda/taslak durum yonetimi."
      publicPath="/products"
      adminPath="/admin/products"
      fields={[
        { name: "name", label: "Urun" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Aciklama" },
        { name: "price", label: "Fiyat", type: "number" },
        { name: "stock", label: "Stok", type: "number" }
      ]}
    />
  );
}
