import { ArrowLeft, Search, Filter } from "lucide-react";
import { mobileAccount } from "../../data/demo";

/** Konto tab: search, filter and a three-column grid of partner tiles. */
export default function MobileAccountView() {
  const { searchPlaceholder, partners } = mobileAccount;

  return (
    <div className="bg-ink-100/70">
      {/* screen title, as in the app: back arrow left of the heading */}
      <div className="flex items-center gap-3 bg-white px-3 py-2.5">
        <ArrowLeft size={14} strokeWidth={2} className="text-ink-900" aria-hidden="true" />
        <span className="text-[0.8rem] font-medium text-ink-900">Konto</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-3">
        {/* Not a real input — the demo is a picture, nothing here submits. */}
        <span className="flex flex-1 items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-sm">
          <Search size={12} strokeWidth={2} className="text-ink-600" aria-hidden="true" />
          <span className="text-[0.65rem] text-ink-600">{searchPlaceholder}</span>
        </span>

        <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
          <Filter size={12} strokeWidth={2} className="text-ink-900" aria-hidden="true" />
          <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
      </div>

      <ul className="grid grid-cols-3 gap-2 px-3 pb-4">
        {partners.map((partner) => (
          <li key={partner.name} className="rounded-lg bg-white p-1.5 shadow-sm">
            <span
              className={`flex h-11 items-center justify-center rounded-md px-1 text-center text-[0.55rem] leading-tight font-semibold text-white ${partner.color}`}
            >
              {partner.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
