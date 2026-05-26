type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
