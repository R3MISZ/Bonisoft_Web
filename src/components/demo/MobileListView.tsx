import { Check } from "lucide-react";
import { mobileListViews } from "../../data/demo";

type ListViewId = keyof typeof mobileListViews;

interface Props {
  viewId: ListViewId;
  done: string[];
  onToggle: (title: string) => void;
}

/** Aktionen, Dashboard, Konto and Dienste all render as a list. */
export default function MobileListView({ viewId, done, onToggle }: Props) {
  const view = mobileListViews[viewId];
  const checkable = view.checkable;

  return (
    <div className="px-4 py-3">
      <div className="flex gap-2">
        {view.stats.map((stat) => (
          <div key={stat.label} className="flex-1 rounded-lg bg-ink-100/60 p-2.5">
            <p className="text-[0.65rem] text-ink-600">{stat.label}</p>
            <p className="text-base font-semibold tabular-nums text-ink-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <ul className="mt-3 space-y-2">
        {view.rows.map((row) => {
          const completed = done.includes(row.title) || row.status === "Erledigt";

          return (
            <li key={row.title}>
              <button
                type="button"
                disabled={!checkable}
                onClick={() => onToggle(row.title)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  checkable && completed ? "border-brand-500 bg-brand-100/60" : "border-ink-100"
                } ${checkable ? "cursor-pointer hover:border-brand-500" : "cursor-default"}`}
              >
                {checkable && (
                  <span
                    aria-hidden="true"
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      completed ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300"
                    }`}
                  >
                    {completed && <Check size={11} strokeWidth={3} />}
                  </span>
                )}

                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[0.8rem] ${
                      completed && checkable ? "text-ink-600 line-through" : "text-ink-900"
                    }`}
                  >
                    {row.title}
                  </span>
                  <span className="block truncate text-[0.7rem] text-ink-600">{row.meta}</span>
                </span>

                <span className="shrink-0 text-[0.65rem] text-ink-600">{row.status}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
