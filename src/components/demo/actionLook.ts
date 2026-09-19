import {
  ShieldCheck, Footprints, CalendarCheck, GraduationCap, ClipboardCheck, PackageCheck,
} from "lucide-react";

/**
 * Icon and colour per action, keyed by the action's icon name.
 * Portal and app look the action up here, so both stay in sync.
 */
const looks = {
  securing: { Icon: ShieldCheck, color: "text-emerald-600" },
  walkthrough: { Icon: Footprints, color: "text-blue-600" },
  attendance: { Icon: CalendarCheck, color: "text-violet-600" },
  training: { Icon: GraduationCap, color: "text-amber-600" },
  handover: { Icon: ClipboardCheck, color: "text-teal-600" },
  incoming: { Icon: PackageCheck, color: "text-rose-600" },
};

export type ActionIcon = keyof typeof looks;

export function actionLook(icon: ActionIcon) {
  return looks[icon];
}
