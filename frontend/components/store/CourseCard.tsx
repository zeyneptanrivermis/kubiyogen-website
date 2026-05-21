import Link from "next/link";

type CourseCardProps = {
  title: string;
  slug: string;
  category: string;
  price: string;
  instructor?: string;
};

export function CourseCard({ title, slug, category, price, instructor }: CourseCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-6 shadow-card">
      <p className="text-sm font-semibold text-brand-700">{category}</p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
      {instructor && (
        <p className="mt-2 text-sm text-slate-500">{instructor}</p>
      )}
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-ink">{price}</span>
        <Link
          href={`/magaza/dijital-egitimler/${slug}`}
          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink"
        >
          İncele
        </Link>
      </div>
    </article>
  );
}
