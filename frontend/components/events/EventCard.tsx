import Link from "next/link";

type EventCardProps = {
  title: string;
  slug: string;
  date: string;
  location?: string;
  price?: string;
  instructor?: string;
  quota?: string;
  subtitle?: string;
  body?: string;
  meta?: string;
  ctaLabel?: string;
};

export function EventCard({ title, slug, date, location, instructor, price, quota, body, meta, ctaLabel = "Detaya Git" }: EventCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-6 shadow-card">
      <p className="text-sm font-semibold text-brand-700">{date}</p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
      <div className="mt-4 space-y-1 text-sm text-slate-600">
        {body ? <p>{body}</p> : (
          <>
            <p>{location}</p>
            {instructor && <p>{instructor}</p>}
            {quota && <p>{quota}</p>}
          </>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-ink">{meta ?? price}</span>
        <Link
          href={`/etkinlikler/${slug}`}
          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
