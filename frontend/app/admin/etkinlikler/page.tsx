import { AdminResourceManager } from "@/components/admin-resource-manager";

export default function AdminEventsPage() {
  return (
    <AdminResourceManager
      title="Etkinlikler"
      description="Etkinlik ekleme, duzenleme, taslak/yayin durumu ve tarih kontrolleri."
      publicPath="/events"
      adminPath="/admin/events"
      fields={[
        { name: "title", label: "Baslik" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Aciklama" },
        { name: "date", label: "Tarih", type: "datetime-local" },
        { name: "location", label: "Lokasyon" },
        { name: "price", label: "Fiyat", type: "number" },
        { name: "isUpcoming", label: "Yaklasan", type: "checkbox" }
      ]}
    />
  );
}
