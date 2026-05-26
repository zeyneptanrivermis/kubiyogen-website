import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { getCourseBySlug, formatPrice } from "@/lib/catalog-api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-soft">
      <PageHero
        title={course.title}
        description={`${course.category} / ${course.language} Dilinde Dijital Eğitim`}
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <article className="rounded-lg border border-line bg-white p-8 shadow-card">
              <h2 className="text-2xl font-bold text-ink">Eğitim Hakkında</h2>
              <div className="mt-6 text-base leading-8 text-slate-700 space-y-4">
                {course.description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="text-lg font-bold text-ink mb-4">Bu Eğitimde Neler Öğreneceksiniz?</h3>
                <div className="grid gap-4 sm:grid-cols-2 text-slate-600 text-sm">
                  <div className="flex gap-2">
                    <span className="text-brand-700 font-bold">✓</span>
                    <span>Modern biyoinformatik araçlarının teorik altyapısı ve pratik kullanımı</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-700 font-bold">✓</span>
                    <span>Genom veri analizinde Python ve R kütüphanelerinin entegrasyonu</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-700 font-bold">✓</span>
                    <span>DNA, RNA dizileme verilerinin filtrelenmesi ve yorumlanması</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-700 font-bold">✓</span>
                    <span>Proje odaklı uygulamalar ve gerçek bilimsel makale veri kümeleri</span>
                  </div>
                </div>
              </div>
            </article>

            <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide">Eğitim Detayları</p>
              <div className="mt-4 space-y-4 text-sm font-semibold text-ink">
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Kategori:</span>
                  <span>{course.category}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Dil:</span>
                  <span>{course.language}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Erişim Süresi:</span>
                  <span>Sınırsız / Ömür Boyu</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500 font-medium">Eğitim Ücreti:</span>
                  <span className="text-lg font-bold text-brand-800">{formatPrice(course.price)}</span>
                </div>
              </div>

              <div className="mt-6">
                <AddToCartButton itemType="COURSE" itemId={course.id} />
              </div>

              <Link
                href="/magaza/dijital-egitimler"
                className="mt-4 block text-center text-xs font-bold text-slate-600 hover:text-brand-700"
              >
                ← Dijital Eğitimlere Dön
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
