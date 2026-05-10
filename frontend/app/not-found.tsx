import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16">
      <p className="text-sm font-bold uppercase text-brand-700">404</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Sayfa bulunamadi</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Aradigin sayfa tasinmis ya da henuz yayinda olmayabilir.</p>
      <div className="mt-6">
        <Link href="/">
          <Button>Ana sayfaya don</Button>
        </Link>
      </div>
    </main>
  );
}
