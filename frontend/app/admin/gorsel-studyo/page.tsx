"use client";

import { AdminApiTable } from "@/components/admin-api-table";

export default function AdminVisualStudioPage() {
  return (
    <AdminApiTable
      title="Görsel Stüdyo"
      description="Kullanıcıların ücretsiz hak ve Pro durumları backend'den canlı olarak listelenir."
      path="/admin/visual-credits"
      columns={[
        { label: "Kullanıcı", get: (item) => String((item.user as { email?: string } | undefined)?.email ?? "-") },
        { label: "Ücretsiz Hak", get: (item) => `${String(item.freeExportsUsed ?? 0)}/${String(item.freeExportsLimit ?? 3)}` },
        { label: "Pro", get: (item) => item.isPro ? "Aktif" : "Pasif" },
        { label: "Güncelleme", get: (item) => String(item.updatedAt ?? "-").slice(0, 10) }
      ]}
    />
  );
}
