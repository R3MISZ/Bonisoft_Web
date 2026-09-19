import {
  CalendarDays, Link2, File, Folder, AlignLeft, Trophy, Clock, CalendarOff,
  FileLock2, BadgeCheck, ShieldCheck,
} from "lucide-react";
import { modules } from "../../data/platform";

const components = {
  calendar: CalendarDays,
  file: File,
  folder: Folder,
  text: AlignLeft,
  link: Link2,
  trophy: Trophy,
  clock: Clock,
  absence: CalendarOff,
  personalDocs: FileLock2,
  status: BadgeCheck,
  insurance: ShieldCheck,
};

/**
 * Text colours matching the module backgrounds. Written out because Tailwind
 * only builds classes it finds in the source — a derived string would not exist.
 */
const textColors: Record<string, string> = {
  "bg-teal-500": "text-teal-500",
  "bg-indigo-500": "text-indigo-500",
  "bg-amber-500": "text-amber-500",
  "bg-emerald-500": "text-emerald-500",
  "bg-blue-500": "text-blue-500",
  "bg-orange-500": "text-orange-500",
  "bg-violet-500": "text-violet-500",
  "bg-red-500": "text-red-500",
  "bg-slate-500": "text-slate-500",
  "bg-yellow-500": "text-yellow-500",
  "bg-rose-700": "text-rose-700",
};

/**
 * Icon and colour per module type, keyed by the module's label.
 * Portal and app look the module up here, so both stay in sync.
 * `color` fills a tile, `textColor` tints the icon itself.
 */
export function moduleLook(type: string) {
  const module = modules.find((entry) => entry.label === type);
  const color = module?.color ?? "bg-slate-500";

  return {
    Icon: module ? components[module.icon] : File,
    color,
    textColor: textColors[color] ?? "text-slate-500",
  };
}
