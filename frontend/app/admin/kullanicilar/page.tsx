"use client";

import { AdminApiTable } from "@/components/admin-api-table";

export default function AdminUsersPage() {
  return (
    <AdminApiTable
      title="Kullanıcılar"
      description="Kullanıcılar backend admin endpointinden canlı olarak listelenir."
      path="/admin/users"
      columns={[
        { label: "Ad", get: (item) => String(item.name ?? "-") },
        { label: "E-posta", get: (item) => String(item.email ?? "-") },
        { label: "Rol", get: (item) => String(item.role ?? "-") },
        { label: "Kayıt", get: (item) => String(item.createdAt ?? "-").slice(0, 10) }
      ]}
    />
  );
}
