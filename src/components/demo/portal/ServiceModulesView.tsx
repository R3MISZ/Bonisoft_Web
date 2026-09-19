import { Eye, EyeOff } from "lucide-react";
import { portalServiceModules } from "../../../data/portal";
import { moduleLook } from "../moduleLook";

/** Card grid showing which module a service is built from and who sees it. */
export default function ServiceModulesView() {
  return (
    <ul className="grid grid-cols-2 gap-2.5">
      {portalServiceModules.cards.map((card) => {
        const { Icon, textColor } = moduleLook(card.type);

        return (
          <li key={card.name} className="rounded-lg border border-ink-100 p-3">
            <div className="flex items-center gap-2">
              <Icon
                size={16}
                strokeWidth={1.75}
                className={`shrink-0 ${textColor}`}
                aria-hidden="true"
              />
              <p className="truncate text-[0.7rem] font-medium text-ink-900">{card.name}</p>
            </div>

            <p className="mt-2 text-[0.6rem] text-ink-600">{card.type}</p>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.55rem] ${
                  card.visible ? "bg-brand-100 text-ink-800" : "bg-ink-100 text-ink-600"
                }`}
              >
                {card.visible ? <Eye size={9} aria-hidden="true" /> : <EyeOff size={9} aria-hidden="true" />}
                {card.visible ? "Sichtbar" : "Versteckt"}
              </span>
              <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[0.55rem] text-ink-600">
                {card.scope}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
