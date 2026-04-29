import Link from "next/link";
import { AdminSection } from "@/components/admin/admin-section";
import { adminCourses } from "@/components/admin/admin-data";
import { Badge, Button, Table } from "@/components/ui";

export default function AdminCoursesPage() {
  return (
    <AdminSection
      title="Kurslar"
      description="Dijital ve yuz yuze egitimlerin admin listesi."
      action={
        <Link href="/admin/kurslar/yeni">
          <Button>Yeni Kurs</Button>
        </Link>
      }
    >
      <Table
        data={adminCourses}
        columns={[
          { key: "title", header: "Baslik", cell: (row) => row.title },
          { key: "language", header: "Dil", cell: (row) => row.language },
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
