import { AdminSection } from "@/components/admin/admin-section";
import { adminOrders } from "@/components/admin/admin-data";
import { Badge, Button, Table } from "@/components/ui";

export default function AdminOrdersPage() {
  return (
    <AdminSection title="Siparisler" description="Duruma gore filtreleme ve siparis detayina hazir operasyon ekrani.">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <select className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none">
          <option>Tum siparisler</option>
          <option>PAID</option>
          <option>PENDING</option>
          <option>CANCELLED</option>
        </select>
        <Button variant="secondary">CSV Disari Aktar</Button>
      </div>
      <Table
        data={adminOrders}
        columns={[
          { key: "code", header: "Siparis", cell: (row) => row.code },
          { key: "user", header: "Kullanici", cell: (row) => row.user },
          { key: "date", header: "Tarih", cell: (row) => row.date },
          { key: "amount", header: "Tutar", cell: (row) => row.amount },
          {
            key: "status",
            header: "Durum",
            cell: (row) => (
              <Badge tone={row.status === "PAID" ? "success" : row.status === "PENDING" ? "warning" : "danger"}>
                {row.status}
              </Badge>
            )
          }
        ]}
      />
    </AdminSection>
  );
}
