type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
};

export function Table<T>({ columns, data, emptyText = "Kayit bulunamadi." }: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-left text-sm">
          <thead className="bg-soft text-xs font-bold uppercase text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="whitespace-nowrap px-4 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-soft/70">
                  {columns.map((column) => (
                    <td key={column.key} className="whitespace-nowrap px-4 py-4 text-slate-700">
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={columns.length}>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
