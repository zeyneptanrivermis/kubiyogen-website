import { AdminSection } from "@/components/admin/admin-section";
import { adminAccessCodes } from "@/components/admin/admin-data";
import { Badge, Button, Pagination, Table } from "@/components/ui";

export default function AdminAccessCodesPage() {
  return (
    <AdminSection title="Erisim kodlari" description="Dijital icerik ve oyun erisim kodlarini uretme, kopyalama ve iptal etme ekrani.">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="grid gap-3 md:grid-cols-2">
          <select className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none">
            <option>Tum durumlar</option>
            <option>Aktif</option>
            <option>Kullanilmadi</option>
            <option>Iptal</option>
          </select>
          <input className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none" type="number" min={1} placeholder="Toplu uretim adedi" />
        </div>
        <Button>Yeni Kod Uret</Button>
      </div>
      <div className="space-y-4">
        <Table
          searchable
          searchPlaceholder="Kod veya hedef icerik ara"
          data={adminAccessCodes}
          columns={[
            { key: "code", header: "Kod", cell: (row) => row.code, sortValue: (row) => row.code },
            { key: "target", header: "Hedef", cell: (row) => row.target, sortValue: (row) => row.target },
            { key: "expiresAt", header: "Son Tarih", cell: (row) => row.expiresAt, sortValue: (row) => row.expiresAt },
            { key: "uses", header: "Kullanim", cell: (row) => row.uses, sortValue: (row) => row.uses },
            {
              key: "status",
              header: "Durum",
              cell: (row) => (
                <Badge tone={row.status === "Aktif" ? "success" : row.status === "Iptal" ? "danger" : "info"}>
                  {row.status}
                </Badge>
              ),
              sortValue: (row) => row.status
            },
            {
              key: "actions",
              header: "Islem",
              cell: () => (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">Kopyala</Button>
                  <Button size="sm" variant="danger">Iptal</Button>
                </div>
              )
            }
          ]}
        />
        <Pagination page={1} totalPages={3} />
      </div>
    </AdminSection>
  );
}
