export function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-card">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <strong className="text-2xl font-bold text-ink">{value}</strong>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
          {change}
        </span>
      </div>
    </article>
  );
}
