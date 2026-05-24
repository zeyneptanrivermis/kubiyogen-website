import Link from "next/link";
import { Container } from "@/components/container";
import { RequireAuth } from "@/components/require-auth";
import { adminSections } from "@/lib/site-data";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Container className="py-8">
        <RequireAuth adminOnly title="Admin paneli">
          <section className="mb-8 rounded-lg bg-ink p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-brand-200">Kubiyogen Admin</p>
                <h1 className="mt-2 text-2xl font-bold">Yönetim Paneli</h1>
              </div>
              <Link href="/" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink">
                Siteye Dön
              </Link>
            </div>
          </section>
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="self-start rounded-lg border border-line bg-white p-3 shadow-card">
              <nav className="grid gap-1">
                <Link href="/admin" className="rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-soft">
                  Dashboard
                </Link>
                {adminSections.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-soft hover:text-ink"
                  >
                    {section.title}
                  </Link>
                ))}
              </nav>
            </aside>
            <div>{children}</div>
          </div>
        </RequireAuth>
      </Container>
    </main>
  );
}
