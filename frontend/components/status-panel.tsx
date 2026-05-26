type StatusPanelProps = {
  title: string;
  items: readonly string[];
};

export function StatusPanel({ title, items }: StatusPanelProps) {
  return (
    <section className="rounded-lg border border-line bg-white p-6 shadow-card">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-lg bg-soft px-4 py-3 text-sm leading-6 text-slate-700">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-700" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
