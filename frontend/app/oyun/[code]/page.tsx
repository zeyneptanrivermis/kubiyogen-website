import { Container } from "@/components/container";

type GamePageProps = {
  params: { code: string };
};

export default function GameWrapperPage({ params }: GamePageProps) {
  return (
    <main>
      <section className="py-16">
        <Container>
          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-brand-700">Kod: {params.code}</p>
            <h1 className="mt-3 text-3xl font-bold text-ink">Egitim Oyunu</h1>
            <div className="mt-6 aspect-video rounded-lg bg-soft p-6 text-center text-sm leading-7 text-slate-600">
              Harici oyun veya interaktif egitim iframe olarak buraya gomulecek.
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
