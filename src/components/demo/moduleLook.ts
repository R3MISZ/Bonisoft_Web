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
 * Icon and colour per module type, keyed by the module's label.
 * Portal and app look the module up here, so both stay in sync.
 */
export function moduleLook(type: string) {
  const module = modules.find((entry) => entry.label === type);
  return {
    Icon: module ? components[module.icon] : File,
    color: module?.color ?? "bg-slate-500",
  };
}
