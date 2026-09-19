import { CircleUserRound, MessageSquareWarning, Landmark } from "lucide-react";
import { mobileServices } from "../../data/demo";
import { moduleLook } from "./moduleLook";

/**
 * Fixed entries the app always has, independent of what a customer configured.
 * Plain black icons, so they read as app functions rather than modules.
 */
const fixedTiles = [
  { label: "Profil", Icon: CircleUserRound },
  { label: "Feedback", Icon: MessageSquareWarning },
  { label: "Konto", Icon: Landmark },
];

const tileClass =
  "flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-white px-2 text-center transition-colors hover:bg-brand-100/60";

/** Dienste tab: one grid holding the fixed entries and the service modules. */
export default function MobileServicesView() {
  return (
    <div className="bg-ink-100/70 px-3 py-4">
      <ul className="grid grid-cols-2 gap-2.5">
        {fixedTiles.map(({ label, Icon }) => (
          <li key={label}>
            <button type="button" className={tileClass}>
              <span className="flex h-8 w-8 items-center justify-center">
                <Icon size={22} strokeWidth={1.75} className="text-ink-900" aria-hidden="true" />
              </span>
              <span className="text-[0.68rem] leading-tight text-ink-900">{label}</span>
            </button>
          </li>
        ))}

        {mobileServices.map((service) => {
          const { Icon, textColor } = moduleLook(service.type);

          return (
            <li key={service.name}>
              <button type="button" className={tileClass}>
                <span className="flex h-8 w-8 items-center justify-center">
                  <Icon size={22} strokeWidth={1.75} className={textColor} aria-hidden="true" />
                </span>
                <span className="text-[0.68rem] leading-tight text-ink-900">{service.name}</span>
                <span className="text-[0.55rem] leading-tight text-ink-600">{service.type}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
