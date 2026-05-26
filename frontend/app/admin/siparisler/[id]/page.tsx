import { AdminSection } from "@/components/admin/admin-section";
import { adminOrders } from "@/components/admin/admin-data";
import { Badge, Button, Select } from "@/components/ui";

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = adminOrders.find((item) => item.id === params.id) ?? adminOrders[0];

  return (
    <AdminSection title={`${order.code} siparis detayi`} description="Urunler, kullanici, odeme bilgisi ve durum guncelleme alani.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-lg border border-line bg-white p-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Kullanici</dt>
              <dd className="mt-1 font-semibold text-ink">{order.user}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Tutar</dt>
              <dd className="mt-1 font-semibold text-ink">{order.amount}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Odeme</dt>
              <dd className="mt-1 font-semibold text-ink">{order.payment}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Durum</dt>
              <dd className="mt-1"><Badge tone={order.status === "PAID" ? "success" : order.status === "PENDING" ? "warning" : "danger"}>{order.status}</Badge></dd>
            </div>
          </dl>
          <div className="mt-6 rounded-lg bg-soft p-4">
            <p className="text-xs font-bold uppercase text-slate-500">Urunler</p>
            <p className="mt-2 text-sm font-medium text-ink">{order.items}</p>
          </div>
        </div>
        <aside className="space-y-4 rounded-lg border border-line bg-white p-5">
          <Select
            label="Siparis durumu"
            defaultValue={order.status}
            options={[
              { label: "PENDING", value: "PENDING" },
              { label: "PAID", value: "PAID" },
              { label: "CANCELLED", value: "CANCELLED" }
            ]}
          />
          <Button className="w-full">Durumu Guncelle</Button>
          <Button className="w-full" variant="secondary">CSV Olarak Indir</Button>
        </aside>
      </div>
    </AdminSection>
  );
}
