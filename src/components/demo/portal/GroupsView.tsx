import { ClipboardCheck, Trophy, Zap, Truck, Clock, CalendarDays, Link2, File } from "lucide-react";
import { portalGroups } from "../../../data/portal";

const chipIcons: Record<string, typeof Zap> = {
  clipboard: ClipboardCheck,
  trophy: Trophy,
  zap: Zap,
  truck: Truck,
  clock: Clock,
  calendar: CalendarDays,
  link: Link2,
  file: File,
};

/** Small square chip per assigned module, like the badges in the portal. */
function Chips({ keys, extra = 0 }: { keys: readonly string[]; extra?: number }) {
  if (keys.length === 0) return <span className="text-ink-300">—</span>;

  return (
    <span className="flex items-center gap-1">
      {keys.map((key) => {
        const Icon = chipIcons[key] ?? Zap;
        return (
          <span
            key={key}
            className="flex h-5 w-5 items-center justify-center rounded border border-ink-100 bg-white"
          >
            <Icon size={11} strokeWidth={2} className="text-ink-800" aria-hidden="true" />
          </span>
        );
      })}
      {extra > 0 && (
        <span className="flex h-5 items-center rounded border border-ink-100 px-1 text-[0.55rem] text-ink-600">
          +{extra}
        </span>
      )}
    </span>
  );
}

/** Groups and which modules are assigned to them. */
export default function GroupsView() {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-100">
      <table className="w-full text-left text-[0.68rem]">
        <thead className="bg-ink-100/60 text-ink-600">
          <tr>
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Aktionsmodule</th>
            <th className="px-3 py-2 font-medium">Servicemodule</th>
            <th className="px-3 py-2 text-right font-medium">Mitarbeiter</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {portalGroups.rows.map((row) => (
            <tr key={row.name}>
              <td className="px-3 py-2 font-medium text-ink-900">{row.name}</td>
              <td className="px-3 py-2"><Chips keys={row.actions} extra={row.extra} /></td>
              <td className="px-3 py-2"><Chips keys={row.services} /></td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-600">{row.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
