import { useState } from "react";
import { portalViews, type PortalViewId } from "../../data/demo";

/** Manager view: sidebar, topbar, content. A mock, not the real portal. */
export default function PortalDemo() {
  const [viewId, setViewId] = useState<PortalViewId>("kennzahlen");
  const view = portalViews.find((item) => item.id === viewId) ?? portalViews[0];

  return (
    <div className="overflow-hidden rounded-xl border border-ink-300/60 bg-white shadow-sm">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-100/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        <span className="ml-3 text-xs text-ink-600">portal.bonisoft.de</span>
      </div>

      <div className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9.5rem_1fr]">
        <nav aria-label="Portalbereiche" className="border-r border-ink-100 bg-ink-100/40 p-2">
          {portalViews.map((item) => {
            const isActive = item.id === view.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setViewId(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`mb-1 block w-full rounded-lg px-3 py-2 text-left text-xs transition-colors sm:text-sm ${
                  isActive
                    ? "bg-ink-900 font-medium text-white"
                    : "text-ink-800 hover:bg-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="min-h-[19rem]">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3">
            <p className="text-sm font-medium text-ink-900">{view.title}</p>
            <span className="hidden rounded-full bg-brand-100 px-3 py-1 text-xs text-ink-800 sm:inline">
              Live
            </span>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {view.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-ink-100/60 p-3">
                  <p className="text-[0.7rem] text-ink-600">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-ink-900">
                    {stat.value}
                  </p>
                  {stat.trend && <p className="text-[0.7rem] text-brand-600">{stat.trend}</p>}
                </div>
              ))}
            </div>

            <ul className="mt-4 divide-y divide-ink-100 border-t border-ink-100">
              {view.rows.map((row) => (
                <li key={row.title} className="flex items-center justify-between gap-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink-900">{row.title}</p>
                    <p className="truncate text-xs text-ink-600">{row.meta}</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink-600">{row.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
