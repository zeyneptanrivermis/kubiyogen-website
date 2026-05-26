import Link from "next/link";
import { Container } from "@/components/container";
import { AccessCodePlayer } from "@/components/access-code-player";

type ContentPageProps = {
  params: { code: string };
};

export default function ProtectedContentPage({ params }: ContentPageProps) {
  return (
    <main>
      <section className="bg-ink py-16 text-white">
        <Container>
          <p className="text-sm font-semibold text-brand-200">Kodlu Erisim</p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">Dijital Egitim Oynatici</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200">
            Bu sayfa backendde POST /api/access-codes/validate ile dogrulanan kodlara acilacak. Aktif kod:
            {" "}<span className="font-semibold text-white">{params.code}</span>
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <AccessCodePlayer initialCode={params.code} />
          <div className="mt-6 rounded-lg border border-line bg-white p-6 shadow-card">
            <Link href="/oyun/KBY-DEMO-2026" className="mt-6 inline-flex rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
              Oyun/Iframe Demo
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
