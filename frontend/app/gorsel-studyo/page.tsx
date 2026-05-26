import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { VisualStudioEditor } from "@/components/visual-studio-editor";
import { visualStudioPlans } from "@/lib/site-data";

export default function VisualStudioPage() {
  return (
    <main>
      <PageHero
        title="Görsel Stüdyo"
        description="Kubiyogen içinde bilimsel görsel üretimi, 3 ücretsiz çıktı ve Pro filigran kaldırma modeli."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <VisualStudioEditor />
          <aside className="grid gap-4">
            {visualStudioPlans.map((plan) => (
              <article key={plan.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
                <p className="text-sm font-semibold text-brand-700">{plan.price}</p>
                <h2 className="mt-2 text-lg font-semibold text-ink">{plan.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{plan.details}</p>
              </article>
            ))}
          </aside>
        </Container>
      </section>
    </main>
  );
}
