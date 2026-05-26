type AdminTableProps = {
  title: string;
  description: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
};

export function AdminTable({ title, description, columns, rows }: AdminTableProps) {
  return (
    <section className="rounded-lg border border-line bg-white shadow-card">
      <div className="border-b border-line p-6">
        <p className="text-sm font-semibold text-brand-700">Admin</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-soft text-ink">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-4 font-semibold">
                  {column}
                </th>
              ))}
              <th className="px-5 py-4 font-semibold">Islem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")} className="border-t border-line">
                {row.map((cell) => (
                  <td key={cell} className="px-5 py-4 text-slate-600">
                    {cell}
                  </td>
                ))}
                <td className="px-5 py-4">
                  <button type="button" className="rounded-lg border border-line px-3 py-2 font-semibold text-ink">
                    Duzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
