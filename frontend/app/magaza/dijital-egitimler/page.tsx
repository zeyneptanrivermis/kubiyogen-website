import { Container } from "@/components/container";
import { ProductCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { formatPrice, getCourses } from "@/lib/catalog-api";

export default async function DigitalTrainingsPage() {
  const courses = await getCourses();

  return (
    <main>
      <PageHero
        title="Dijital Eğitimler"
        description="Dijital eğitimler backend kurs kayıtlarından alınır; dil, kategori ve fiyat bilgisi canlı veridir."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <ProductCard
              key={course.id}
              title={course.title}
              category={`${course.category} / ${course.language}`}
              price={formatPrice(course.price)}
              body={course.description}
              slug={course.slug}
              detailUrlPrefix="/magaza/dijital-egitimler"
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
