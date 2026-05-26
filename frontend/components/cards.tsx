import Link from "next/link";

type EventCardProps = {
  title: string;
  subtitle: string;
  body: string;
  meta?: string;
  ctaLabel?: string;
  slug?: string;
};

export function EventCard({ title, subtitle, body, meta, ctaLabel = "Detayı Gör", slug }: EventCardProps) {
  const cardContent = (
    <article className="h-full flex flex-col justify-between rounded-lg border border-line bg-white p-6 shadow-card hover:shadow-lg transition-all hover:border-brand-200">
      <div>
        <p className="text-sm font-semibold text-brand-700">{subtitle}</p>
        <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 line-clamp-3">{body}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        {meta ? <p className="text-sm font-medium text-slate-500">{meta}</p> : <span />}
        <span className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-soft">
          {ctaLabel}
        </span>
      </div>
    </article>
  );

  return slug ? (
    <Link href={`/etkinlikler/${slug}`} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

type ProductCardProps = {
  title: string;
  category: string;
  price: string;
  body?: string;
  slug?: string;
  detailUrlPrefix: string;
};

export function ProductCard({ title, category, price, body, slug, detailUrlPrefix }: ProductCardProps) {
  const cardContent = (
    <article className="h-full flex flex-col justify-between rounded-lg border border-line bg-white p-6 shadow-card hover:shadow-lg transition-all hover:border-brand-200">
      <div>
        <p className="text-sm font-semibold text-brand-700">{category}</p>
        <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-3">
          {body ?? "Ürün açıklaması, kısa fayda metni ve stok/teslim bilgileri burada yer alacak."}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-ink">{price}</span>
        <span className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
          Detayı Gör
        </span>
      </div>
    </article>
  );

  return slug ? (
    <Link href={`${detailUrlPrefix}/${slug}`} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
