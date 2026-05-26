import { Sidebar } from "@/components/admin/sidebar";
import { TopBar } from "@/components/admin/top-bar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-soft text-ink lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopBar title="Kubiyogen Admin" />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
