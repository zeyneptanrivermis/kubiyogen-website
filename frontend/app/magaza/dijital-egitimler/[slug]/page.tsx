import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { notFound } from "next/navigation";
import { getDigitalTrainings } from "@/lib/api";

type Props = {
  params: { slug: string };
};

export default async function CourseDetailPage({ params }: Props) {
  const courses = await getDigitalTrainings();

  const course = courses.find(
    (c) => c.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!course) return notFound();

  return (
    <main>
      <PageHero title={course.title} description={course.category} />
      <section className="py-16">
        <Container className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-700">{course.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">{course.title}</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">{course.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="text-2xl font-bold text-ink">{course.price}</span>
            <button className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
              Sepete Ekle
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}
