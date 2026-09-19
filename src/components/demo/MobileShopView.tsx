import { ShoppingCart } from "lucide-react";
import { mobileShop } from "../../data/demo";

/** Shop tab: stacked cards on a grey background, like the real app. */
export default function MobileShopView() {
  const { benefits, bonus, voucher, pension } = mobileShop;

  return (
    <div className="space-y-5 bg-ink-100/70 px-3 py-4">
      <section>
        <h4 className="mb-2 px-1 text-[0.8rem] font-medium text-ink-900">{benefits.heading}</h4>
        <div className="rounded-xl bg-white p-3">
          <div className="flex gap-2 overflow-hidden">
            {benefits.tiles.map((tile) => (
              <div
                key={tile.name}
                className={`flex h-16 w-[5.5rem] shrink-0 flex-col justify-end rounded-lg p-2 ${tile.color}`}
              >
                <span className="text-[0.65rem] font-medium text-white">{tile.name}</span>
                <span className="text-[0.6rem] text-white/75">{tile.hint}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h4 className="mb-2 px-1 text-[0.8rem] font-medium text-ink-900">{bonus.heading}</h4>
        <div className="rounded-xl bg-white p-4">
          <p className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-ink-900">{bonus.points}</span>
            <span className="text-[0.7rem] text-ink-600">{bonus.unit}</span>
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-full bg-brand-500 px-4 py-2 text-[0.75rem] font-medium text-white"
          >
            {bonus.action}
          </button>
        </div>
      </section>

      <section>
        <h4 className="mb-2 px-1 text-[0.8rem] font-medium text-ink-900">{voucher.heading}</h4>
        <div className="flex items-center gap-3 rounded-xl bg-white p-4">
          <ShoppingCart size={28} strokeWidth={1.5} className="shrink-0 text-ink-900" aria-hidden="true" />
          <div>
            <p className="text-[0.8rem] font-medium text-ink-900">{voucher.title}</p>
            <p className="text-[0.7rem] text-ink-600">{voucher.text}</p>
          </div>
        </div>
      </section>

      <section>
        <h4 className="mb-2 px-1 text-[0.8rem] font-medium text-ink-900">{pension.heading}</h4>
        <div className="rounded-xl bg-white p-4">
          <p className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-ink-900">{pension.points}</span>
            <span className="text-[0.7rem] text-ink-600">{pension.unit}</span>
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-full border border-ink-300 px-4 py-2 text-[0.75rem] font-medium text-ink-800"
          >
            {pension.action}
          </button>
        </div>
      </section>
    </div>
  );
}
