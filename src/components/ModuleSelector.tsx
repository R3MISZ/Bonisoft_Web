import { useState } from "react";
import { modules, type ModuleId } from "../data/modules";

/**
 * Island: the module tabs. Everything else in the Solution section is static,
 * so only this part ships JavaScript.
 */
export default function ModuleSelector() {
  const [activeId, setActiveId] = useState<ModuleId>(modules[0].id);
  const active = modules.find((module) => module.id === activeId) ?? modules[0];
  const activeIndex = modules.indexOf(active);

  const moveFocus = (offset: number) => {
    const next = modules[(activeIndex + offset + modules.length) % modules.length];
    setActiveId(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,20rem)_1fr]">
      <div
        role="tablist"
        aria-label="Module"
        aria-orientation="vertical"
        className="flex flex-col gap-1"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") moveFocus(1);
          if (event.key === "ArrowUp") moveFocus(-1);
        }}
      >
        {modules.map((module, index) => {
          const isActive = module.id === active.id;
          return (
            <button
              key={module.id}
              id={`tab-${module.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${module.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(module.id)}
              className={`flex items-baseline gap-4 rounded-xl px-5 py-4 text-left transition-colors ${
                isActive ? "bg-ink-900 text-white" : "text-ink-800 hover:bg-ink-100"
              }`}
            >
              <span
                className={`text-xs tabular-nums ${isActive ? "text-brand-500" : "text-ink-600"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-medium">{module.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="rounded-2xl border border-ink-100 bg-ink-100/40 p-8 sm:p-10"
      >
        <h3 className="text-2xl font-semibold text-ink-900">{active.name}</h3>
        <p className="mt-3 text-lg text-ink-800">{active.summary}</p>
        <p className="mt-5 text-ink-600">{active.detail}</p>
      </div>
    </div>
  );
}
