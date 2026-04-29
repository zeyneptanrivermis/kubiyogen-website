import Link from "next/link";
import { AdminSection } from "@/components/admin/admin-section";
import { adminEvents } from "@/components/admin/admin-data";
import { Badge, Button, Table } from "@/components/ui";

export default function AdminEventsPage() {
  return (
    <AdminSection
      title="Etkinlikler"
      description="Etkinlik listeleme, arama ve yayinda/taslak kontrolu."
      action={
        <Link href="/admin/etkinlikler/yeni">
          <Button>Yeni Etkinlik</Button>
        </Link>
      }
    >
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
        <input className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none" placeholder="Etkinlik ara" />
        <select className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none">
          <option>Tum durumlar</option>
          <option>Yayinda</option>
          <option>Taslak</option>
        </select>
      </div>
      <Table
        data={adminEvents}
        columns={[
          { key: "title", header: "Baslik", cell: (row) => row.title },
          { key: "date", header: "Tarih", cell: (row) => row.date },
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
