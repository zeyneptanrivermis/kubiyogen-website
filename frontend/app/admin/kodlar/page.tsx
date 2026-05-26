"use client";

import { AdminApiTable } from "@/components/admin-api-table";

export default function AdminCodesPage() {
  return (
    <AdminApiTable
      title="Erişim Kodları"
      description="Kodlar, kullanım sayacı ve hedef içerik backend'den canlı olarak listelenir."
      path="/admin/access-codes"
      columns={[
        { label: "Kod", get: (item) => String(item.code ?? "-") },
        { label: "Kullanıcı", get: (item) => String((item.user as { email?: string } | undefined)?.email ?? "-") },
        { label: "Hedef", get: (item) => String((item.course as { title?: string } | undefined)?.title ?? (item.event as { title?: string } | undefined)?.title ?? "-") },
        { label: "Kullanım", get: (item) => `${String(item.useCount ?? 0)}/${String(item.maxUses ?? 1)}` },
        { label: "Durum", get: (item) => item.revokedAt ? "İptal" : "Aktif" }
      ]}
    />
  );
}
