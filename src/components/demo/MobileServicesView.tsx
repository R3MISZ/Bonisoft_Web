import {
  CalendarOff, HeartPulse, Clock, CalendarDays, Link2, File, FileLock2, Trophy,
} from "lucide-react";
import { mobileServices, type MobileServiceIcon } from "../../data/demo";

const icons: Record<MobileServiceIcon, typeof Clock> = {
  absence: CalendarOff,
  sick: HeartPulse,
  clock: Clock,
  calendar: CalendarDays,
  link: Link2,
  file: File,
  personalDocs: FileLock2,
  trophy: Trophy,
};

/** Dienste tab: square tiles in two columns, each one a configured module. */
export default function MobileServicesView() {
  return (
    <div className="bg-ink-100/70 px-3 py-4">
      <ul className="grid grid-cols-2 gap-2.5">
        {mobileServices.map((service) => {
          const Icon = icons[service.icon];

          return (
            <li key={service.label}>
              <button
                type="button"
                className="flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-white px-2 text-center transition-colors hover:bg-brand-100/60"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${service.color}`}
                >
                  <Icon size={17} strokeWidth={2} className="text-white" aria-hidden="true" />
                </span>
                <span className="text-[0.68rem] leading-tight text-ink-900">{service.label}</span>
                <span className="text-[0.55rem] leading-tight text-ink-600">{service.module}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
