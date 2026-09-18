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
} from "lucide-react";
import { mobileNav, mobileHeader, type MobileViewId } from "../../data/demo";
import MobileListView from "./MobileListView";
import MobileShopView from "./MobileShopView";
import MobileServicesView from "./MobileServicesView";

/** Icons live here, not in the data file — the data stays plain content. */
const navIcons: Record<MobileViewId, typeof Clock> = {
  aktionen: Clock,
  dashboard: LayoutDashboard,
  konto: WalletCards,
  shop: ShoppingCart,
  dienste: BriefcaseBusiness,
};

/** Employee view: phone frame, app header, bottom navigation. */
export default function MobileDemo() {
  const [viewId, setViewId] = useState<MobileViewId>("shop");
  const [done, setDone] = useState<string[]>([]);

  const toggle = (title: string) =>
    setDone((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );

  return (
    <div className="mx-auto w-full max-w-[17rem]">
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-ink-900 bg-white shadow-sm">
        <div className="flex justify-center bg-ink-900 pb-2">
          <span className="h-1.5 w-16 rounded-full bg-ink-600" />
        </div>

        {/* app header: points, streak, notifications, avatar */}
        <div className="flex items-center gap-2 border-b border-ink-100 px-3 py-2.5">
          <span className="text-base font-semibold text-brand-500">B</span>

          <span className="ml-auto flex items-center gap-1">
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

          <Bell size={14} strokeWidth={1.75} className="text-ink-800" aria-hidden="true" />

          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-[0.6rem] font-medium text-ink-800">
            {mobileHeader.initials}
          </span>
        </div>

        <div className="h-[23rem] overflow-y-auto">
          {viewId === "shop" ? (
            <MobileShopView />
          ) : viewId === "dienste" ? (
            <MobileServicesView />
          ) : (
            <MobileListView viewId={viewId} done={done} onToggle={toggle} />
          )}
        </div>

        <nav
          aria-label="App-Navigation"
          className="grid grid-cols-5 border-t border-ink-100 bg-white"
        >
          {mobileNav.map((item) => {
            const Icon = navIcons[item.id];
            const isActive = item.id === viewId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setViewId(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-0.5 py-2 text-[0.55rem] transition-colors ${
                  isActive ? "font-semibold text-ink-900" : "text-ink-600"
                }`}
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
