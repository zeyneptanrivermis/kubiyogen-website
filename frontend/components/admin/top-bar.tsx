import { Button } from "@/components/ui/button";

export function TopBar({ title }: { title: string }) {
  return (
    <header className="border-b border-line bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-brand-700">Yonetim Paneli</p>
          <h1 className="mt-1 text-2xl font-bold text-ink">{title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">Bildirimler</Button>
          <Button>Yeni Kayit</Button>
        </div>
      </div>
    </header>
  );
}
