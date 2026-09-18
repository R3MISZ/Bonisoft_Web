import { Users, UserCheck, TrendingUp, Zap } from "lucide-react";
import { portalDashboard } from "../../../data/portal";

const icons = { users: Users, userCheck: UserCheck, trending: TrendingUp, zap: Zap };

/** Four key figures and one bar chart, drawn with plain divs. */
export default function DashboardView() {
  const { stats, chart } = portalDashboard;
  const max = Math.max(...chart.bars.map((bar) => bar.value));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((stat) => {
          const Icon = icons[stat.icon];

          return (
            <div key={stat.label} className="rounded-lg border border-ink-100 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[0.65rem] text-ink-600">{stat.label}</p>
                <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-500">
                  <Icon size={13} strokeWidth={2} className="text-white" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-1 text-lg font-semibold tabular-nums text-ink-900">{stat.value}</p>
              {"hint" in stat && <p className="text-[0.6rem] text-ink-600">{stat.hint}</p>}
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-ink-100 p-3">
        <p className="text-[0.7rem] font-medium text-ink-900">{chart.title}</p>
        <ul className="mt-3 space-y-2">
          {chart.bars.map((bar) => (
            <li key={bar.label} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-right text-[0.6rem] text-ink-600">{bar.label}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-sm bg-ink-100">
                <span
                  className="block h-full rounded-sm bg-brand-500"
                  style={{ width: `${Math.round((bar.value / max) * 100)}%` }}
                />
              </span>
              <span className="w-12 shrink-0 text-right text-[0.6rem] tabular-nums text-ink-600">
                {bar.value.toLocaleString("de-DE")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
