"use client";

import { AdminApiTable } from "@/components/admin-api-table";

export default function AdminOrdersPage() {
  return (
    <AdminApiTable
      title="Siparişler"
      description="Siparişler backend admin endpointinden canlı olarak listelenir."
      path="/admin/orders"
      columns={[
        { label: "Sipariş", get: (item) => String(item.id ?? "-") },
        { label: "Kullanıcı", get: (item) => String((item.user as { email?: string } | undefined)?.email ?? "-") },
        { label: "Tutar", get: (item) => `${String(item.totalAmount ?? "0")} TL` },
        { label: "Durum", get: (item) => String(item.status ?? "-") }
      ]}
    />
  );
}
