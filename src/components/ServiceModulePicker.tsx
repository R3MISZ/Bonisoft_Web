import { useState } from "react";
import { modules } from "../data/platform";
import { moduleLook } from "./demo/moduleLook";

/**
 * The eleven service module types to click through: the list on the left,
 * the description of the selected one beside it.
 *
 * Replaces the earlier scrolling band — a moving target cannot be clicked.
 */
export default function ServiceModulePicker() {
  const [selected, setSelected] = useState(0);
  const active = modules[selected];
  const { Icon, color } = moduleLook(active.label);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
      <ul className="flex flex-wrap gap-2">
        {modules.map((module, index) => {
          const look = moduleLook(module.label);
          const isActive = index === selected;

          return (
            <li key={module.label}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={isActive}
                className={`flex items-center gap-2.5 rounded-xl border py-2.5 pr-5 pl-2.5 text-sm transition-colors ${
                  isActive
                    ? "border-brand-500 bg-brand-100/40 text-ink-900"
                    : "border-ink-100 bg-white text-ink-800 hover:border-ink-300"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${module.color}`}>
                  <look.Icon size={16} strokeWidth={2} className="text-white" aria-hidden="true" />
                </span>
                <span className="whitespace-nowrap">{module.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <aside className="rounded-2xl border border-ink-100 bg-ink-100/50 p-6">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon size={20} strokeWidth={2} className="text-white" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-ink-900">{active.label}</h3>
        <p aria-live="polite" className="mt-2 text-sm leading-relaxed text-ink-600">
          {active.description}
        </p>
      </aside>
    </div>
  );
}
