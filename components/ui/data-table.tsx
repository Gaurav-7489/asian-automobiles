import Link from "next/link";

type Cell = string | { text: string; href: string };
const render = (c: Cell) =>
  typeof c === "string" ? c : <Link href={c.href} className="text-amber-700 underline underline-offset-4">{c.text}</Link>;

/** Semantic table ≥ 640px; stacked cards below via CSS with data-label (spec 20.3.17). */
export function DataTable({ caption, columns, rows, stack = true }: { caption: string; columns: string[]; rows: Cell[][]; stack?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className={`data-table ${stack ? "stack" : ""}`}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} scope="col">{c || <span className="sr-only">Topic</span>}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row">{render(c)}</th>
                ) : (
                  <td key={ci} data-label={columns[ci]}>{render(c)}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
