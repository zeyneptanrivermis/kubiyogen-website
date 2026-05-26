type PaginationProps = {
  page: number;
  totalPages: number;
};

export function Pagination({ page, totalPages }: PaginationProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm">
      <span className="font-medium text-slate-600">
        Sayfa {page} / {totalPages}
      </span>
      <div className="flex gap-2">
        <button className="rounded-lg border border-line px-3 py-2 font-semibold text-slate-600 disabled:opacity-50" disabled={page <= 1}>
          Onceki
        </button>
        <button className="rounded-lg border border-line px-3 py-2 font-semibold text-slate-600 disabled:opacity-50" disabled={page >= totalPages}>
          Sonraki
        </button>
      </div>
    </nav>
  );
}
