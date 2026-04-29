import Link from "next/link";
import { AdminSection } from "@/components/admin/admin-section";
import { adminProducts } from "@/components/admin/admin-data";
import { Badge, Button, Table } from "@/components/ui";

export default function AdminProductsPage() {
  return (
    <AdminSection
      title="Urunler"
      description="Aksesuar stok, fiyat ve yayin durumu takibi."
      action={
        <Link href="/admin/urunler/yeni">
          <Button>Yeni Urun</Button>
        </Link>
      }
    >
      <Table
        data={adminProducts}
        columns={[
          { key: "title", header: "Baslik", cell: (row) => row.title },
          { key: "stock", header: "Stok", cell: (row) => row.stock },
          { key: "price", header: "Fiyat", cell: (row) => row.price },
          {
            key: "status",
            header: "Durum",
            cell: (row) => <Badge tone={row.status === "Yayinda" ? "success" : "warning"}>{row.status}</Badge>
          }
        ]}
      />
    </AdminSection>
  );
}
