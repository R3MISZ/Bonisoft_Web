import { Star } from "lucide-react";
import { mobileListViews } from "../../data/demo";
import { actionLook } from "./actionLook";

type ListViewId = keyof typeof mobileListViews;

/** Aktionen, Dashboard and Konto all render as a list of rows. */
export default function MobileListView({ viewId }: { viewId: ListViewId }) {
  const view = mobileListViews[viewId];
  /* Aktionen shows no summary tiles — the tasks carry their own points. */
  const stats = "stats" in view ? view.stats : [];
  const done = "done" in view ? view.done : [];

  return (
    <div className="px-4 py-3">
      {stats.length > 0 && (
        <div className="flex gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 rounded-lg bg-ink-100/60 p-2.5">
              <p className="text-[0.65rem] text-ink-600">{stat.label}</p>
              <p className="text-base font-semibold tabular-nums text-ink-900">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <ul className={stats.length > 0 ? "mt-3 space-y-2" : "space-y-2"}>
        {view.rows.map((row) => {
          const points = "points" in row ? row.points : null;
          const look = "icon" in row ? actionLook(row.icon) : null;

          return (
            <li
              key={row.title}
              className="flex items-center gap-3 rounded-lg border border-ink-100 px-3 py-2.5"
            >
              {look && (
                <look.Icon
                  size={16}
                  strokeWidth={1.75}
                  className={`shrink-0 ${look.color}`}
                  aria-hidden="true"
                />
              )}

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.8rem] text-ink-900">{row.title}</span>
                <span className="block truncate text-[0.7rem] text-ink-600">{row.meta}</span>
              </span>

              {points ? (
                <span className="flex shrink-0 items-center gap-1 text-[0.7rem] font-medium tabular-nums text-ink-800">
                  {points}
                  <Star size={11} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                </span>
              ) : (
                <span className="shrink-0 text-[0.65rem] text-ink-600">
                  {"status" in row ? row.status : null}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {done.length > 0 && (
        <>
          <p className="mt-4 mb-2 text-[0.65rem] text-ink-600">
            {"doneHeading" in view ? view.doneHeading : null}
          </p>

          <ul className="space-y-2">
            {done.map((row) => {
              const { Icon } = actionLook(row.icon);

              return (
              <li
                key={row.title}
                className="flex items-center gap-3 rounded-lg border border-ink-100 bg-ink-100/50 px-3 py-2.5"
              >
                {/* greyed out like the rest of the row — done, not pending */}
                <Icon size={16} strokeWidth={1.75} className="shrink-0 text-ink-300" aria-hidden="true" />

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.8rem] text-ink-600 line-through">
                    {row.title}
                  </span>
                  <span className="block truncate text-[0.7rem] text-ink-300">{row.meta}</span>
                </span>

                <span className="flex shrink-0 items-center gap-1 text-[0.7rem] font-medium tabular-nums text-ink-600">
                  {row.points}
                  <Star size={11} className="fill-ink-300 text-ink-300" aria-hidden="true" />
                </span>
              </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
