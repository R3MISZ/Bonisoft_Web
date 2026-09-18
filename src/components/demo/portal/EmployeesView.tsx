import { portalEmployees } from "../../../data/portal";

/** A short table. No sorting, no pagination — it only has to show the shape. */
export default function EmployeesView() {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-100">
      <table className="w-full text-left text-[0.68rem]">
        <thead className="bg-ink-100/60 text-ink-600">
          <tr>
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Position</th>
            <th className="px-3 py-2 font-medium">Gruppe</th>
            <th className="px-3 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {portalEmployees.rows.map((row) => (
            <tr key={row.name}>
              <td className="px-3 py-2 font-medium text-ink-900">{row.name}</td>
              <td className="px-3 py-2 text-ink-600">{row.position}</td>
              <td className="px-3 py-2 text-ink-600">{row.group}</td>
              <td className="px-3 py-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.6rem] ${
                    row.status === "Aktiv"
                      ? "bg-brand-500 text-white"
                      : "bg-ink-100 text-ink-600"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
