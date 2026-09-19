import { Trophy, Users } from "lucide-react";
import { portalActionModules } from "../../../data/portal";
import { actionLook } from "../actionLook";

/** Card grid, one card per action module. */
export default function ActionModulesView() {
  return (
    <ul className="grid grid-cols-2 gap-2.5">
      {portalActionModules.cards.map((card) => {
        const { Icon, color } = actionLook(card.icon);

        return (
        <li key={card.name} className="flex flex-col rounded-lg border border-ink-100 p-3">
          <div className="flex items-center gap-2">
            <Icon size={16} strokeWidth={1.75} className={`shrink-0 ${color}`} aria-hidden="true" />
            <p className="truncate text-[0.7rem] font-medium text-ink-900">{card.name}</p>
          </div>

          <dl className="mt-3 space-y-1.5 text-[0.6rem]">
            <div className="flex items-center gap-1.5">
              <Trophy size={11} className="shrink-0 text-ink-600" aria-hidden="true" />
              <dt className="text-ink-600">Belohnung</dt>
              <dd className="ml-auto tabular-nums text-ink-900">{card.reward} Punkte</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={11} className="shrink-0 text-ink-600" aria-hidden="true" />
              <dt className="text-ink-600">Teilnehmer</dt>
              <dd className="ml-auto truncate text-ink-900">{card.participants}</dd>
            </div>
          </dl>
        </li>
        );
      })}
    </ul>
  );
}
