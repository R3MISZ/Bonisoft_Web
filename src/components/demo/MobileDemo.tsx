import { useState } from "react";
import {
  Clock,
  LayoutDashboard,
  WalletCards,
  ShoppingCart,
  BriefcaseBusiness,
  Star,
  Flame,
  Bell,
  SignalHigh,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { mobileNav, mobileHeader, type MobileViewId } from "../../data/demo";
import { brand } from "../../data/brand";
import MobileListView from "./MobileListView";
import MobileShopView from "./MobileShopView";
import MobileServicesView from "./MobileServicesView";
import MobileAccountView from "./MobileAccountView";

/** Icons live here, not in the data file — the data stays plain content. */
const navIcons: Record<MobileViewId, typeof Clock> = {
  aktionen: Clock,
  dashboard: LayoutDashboard,
  konto: WalletCards,
  shop: ShoppingCart,
  dienste: BriefcaseBusiness,
};

const initialView: MobileViewId = "aktionen";

/** Employee view: phone frame, app header, bottom navigation. */
export default function MobileDemo() {
  const [viewId, setViewId] = useState<MobileViewId>(initialView);
  /* The starting view is on screen already, so it never needs the hint. */
  const [opened, setOpened] = useState<MobileViewId[]>([initialView]);

  const open = (id: MobileViewId) => {
    setViewId(id);
    setOpened((seen) => (seen.includes(id) ? seen : [...seen, id]));
  };

  return (
    <div className="mx-auto w-full max-w-68">
      <div className="overflow-hidden rounded-4xl border-[6px] border-ink-900 bg-white shadow-sm">
        {/* status bar: time left, dynamic island centred, radios right */}
        <div className="relative flex items-center justify-between px-4 pt-2 pb-1">
          <span className="text-[0.7rem] font-semibold text-ink-900">9:41</span>

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1.5 h-4 w-14 -translate-x-1/2 rounded-full bg-ink-900"
          />

          <span className="flex items-center gap-1 text-ink-900">
            <SignalHigh size={12} strokeWidth={2.5} aria-hidden="true" />
            <Wifi size={12} strokeWidth={2.5} aria-hidden="true" />
            <BatteryFull size={14} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>

        {/* app header: points, streak, notifications, avatar */}
        <div className="flex items-center border-b border-ink-100 px-3 py-2.5">
          <img src={brand.signet} alt="" className="h-5 w-5" />

          {/* counters sit in the middle, bell and avatar share the space to the right */}
          <span className="flex flex-1 items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-[0.75rem] font-medium tabular-nums text-ink-900">
                {mobileHeader.points}
              </span>
            </span>

            <span className="flex items-center gap-1">
              <Flame size={13} className="fill-brand-500 text-brand-500" aria-hidden="true" />
              <span className="text-[0.75rem] font-medium tabular-nums text-ink-900">
                {mobileHeader.streak}
              </span>
            </span>
          </span>

          <span className="flex flex-1 items-center justify-between">
            <Bell size={14} strokeWidth={1.75} className="text-ink-800" aria-hidden="true" />

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-[0.6rem] font-medium text-ink-800">
              {mobileHeader.initials}
            </span>
          </span>
        </div>

        <div className="h-100 overflow-y-auto">
          {viewId === "shop" ? (
            <MobileShopView />
          ) : viewId === "dienste" ? (
            <MobileServicesView />
          ) : viewId === "konto" ? (
            <MobileAccountView />
          ) : (
            <MobileListView viewId={viewId} />
          )}
        </div>

        <nav
          aria-label="App-Navigation"
          className="grid grid-cols-5 border-t border-ink-100 bg-white p-1"
        >
          {mobileNav.map((item) => {
            const Icon = navIcons[item.id];
            const isActive = item.id === viewId;
            const hint = !opened.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => open(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-0.5 py-2 text-[0.55rem] transition-colors ${isActive ? "font-semibold text-ink-900" : "text-ink-600"
                  } ${hint ? "demo-hint [--hint-base:var(--color-ink-600)]" : ""}`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
