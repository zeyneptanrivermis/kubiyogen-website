import { AdminSection } from "@/components/admin/admin-section";
import { adminUsers } from "@/components/admin/admin-data";
import { UserActions } from "@/components/admin/user-actions";
import { Badge, Table } from "@/components/ui";

export default function AdminUsersPage() {
  return (
    <AdminSection title="Kullanicilar" description="Rol filtreleme, profil modal ve siparis gecmisi girisi.">
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
        <input className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none" placeholder="Kullanici ara" />
        <select className="rounded-lg border border-line px-3 py-2.5 text-sm outline-none">
          <option>Tum roller</option>
          <option>ADMIN</option>
          <option>USER</option>
        </select>
      </div>
      <Table
        data={adminUsers}
        columns={[
          { key: "name", header: "Ad", cell: (row) => row.name },
          { key: "email", header: "E-posta", cell: (row) => row.email },
          {
            key: "role",
            header: "Rol",
            cell: (row) => <Badge tone={row.role === "ADMIN" ? "info" : "neutral"}>{row.role}</Badge>
          },
          { key: "orders", header: "Siparis", cell: (row) => row.orders },
          { key: "actions", header: "Islem", cell: (row) => <UserActions name={row.name} role={row.role} /> }
        ]}
      />
    </AdminSection>
  );
}
