"use client";

import { Button } from "@/components/ui";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16">
      <p className="text-sm font-bold uppercase text-rose-600">500</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Bir hata olustu</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Sayfa yuklenirken beklenmeyen bir sorunla karsilasildi.</p>
      <div className="mt-6">
        <Button onClick={reset}>Tekrar dene</Button>
      </div>
    </main>
  );
}
