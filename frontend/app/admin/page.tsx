import { AdminSection } from "@/components/admin/admin-section";
import { adminOrders, adminStats } from "@/components/admin/admin-data";
import { StatCard } from "@/components/admin/stat-card";
import { Badge, ProgressBar, Table } from "@/components/ui";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <AdminSection title="Son siparisler" description="Odeme durumu ve toplam tutar takibi icin dashboard ozeti.">
          <Table
            data={adminOrders}
            columns={[
              { key: "code", header: "Kod", cell: (row) => row.code },
              { key: "user", header: "Kullanici", cell: (row) => row.user },
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

        <AdminSection title="Haftalik hedefler" description="Basit grafik alani. Recharts baglaninca burasi canli veriye donecek.">
          <div className="space-y-5">
            <ProgressBar value={78} label="Satis hedefi" />
            <ProgressBar value={64} label="Etkinlik doluluk" />
            <ProgressBar value={42} label="Yeni kullanici" />
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
