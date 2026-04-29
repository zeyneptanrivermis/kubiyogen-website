type EventCardProps = {
  title: string;
  subtitle: string;
  body: string;
  meta?: string;
  ctaLabel?: string;
};

export function EventCard({ title, subtitle, body, meta, ctaLabel = "Detayi Gor" }: EventCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-6 shadow-card">
      <p className="text-sm font-semibold text-brand-700">{subtitle}</p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{body}</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        {meta ? <p className="text-sm font-medium text-slate-500">{meta}</p> : <span />}
        <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}

type ProductCardProps = {
  title: string;
  category: string;
  price: string;
};

export function ProductCard({ title, category, price }: ProductCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-6 shadow-card">
      <p className="text-sm font-semibold text-brand-700">{category}</p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Urun aciklamasi, kisa fayda metni ve stok/teslim bilgileri burada yer alacak.
      </p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-ink">{price}</span>
        <button className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
          Sepete Ekle
        </button>
      </div>
    </article>
  );
}
