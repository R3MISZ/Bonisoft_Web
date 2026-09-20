import { useState } from "react";
import {
  euro, headcount, leverSaving, retention, retentionSaving, secondaryLevers,
  type SecondaryLever,
} from "../data/businessCase";
import { useCountUp } from "./CountUp";

/**
 * Island: the reader sets the size of their operation and picks the second
 * lever, every figure follows. Two levers at a time — a third would turn a
 * point into a spreadsheet.
 */
export default function BusinessCaseCalculator() {
  const [employees, setEmployees] = useState(headcount.preset);
  const [turnover, setTurnover] = useState(retention.slider.preset);
  const [leverId, setLeverId] = useState<SecondaryLever["id"]>(secondaryLevers[0].id);
  const [leverValues, setLeverValues] = useState<Record<string, number>>(
    Object.fromEntries(secondaryLevers.map((lever) => [lever.id, lever.slider.preset])),
  );

  const lever = secondaryLevers.find((entry) => entry.id === leverId) ?? secondaryLevers[0];
  const leverValue = leverValues[lever.id];

  const retentionTotal = retentionSaving(employees, turnover);
  const leverTotal = leverSaving(lever, employees, leverValue);
  const { ref, shown } = useCountUp(retentionTotal + leverTotal);

  const prevented = employees * (turnover / 100) * retention.preventedShare;

  return (
    <>
      <p className="mt-10 text-sm text-ink-300">Gesamteinsparung pro Jahr</p>
      <p
        ref={ref as React.Ref<HTMLParagraphElement>}
        className="mt-2 text-5xl font-semibold tracking-tight tabular-nums text-brand-500 sm:text-6xl"
      >
        {euro(shown)}
      </p>

      <div className="mt-8 max-w-md">
        <Slider
          label={headcount.label}
          value={employees}
          onChange={setEmployees}
          min={headcount.min}
          max={headcount.max}
          step={headcount.step}
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* always on: what it costs to replace people */}
        <article className="rounded-2xl bg-white/5 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-300">
            {retention.label}
          </p>
          <p className="mt-3 text-2xl font-semibold text-white">{retention.headline}</p>

          <div className="mt-7 border-t border-white/10 pt-6">
            <Slider
              label={retention.slider.label}
              value={turnover}
              onChange={setTurnover}
              min={retention.slider.min}
              max={retention.slider.max}
              step={retention.slider.step}
              unit={retention.slider.unit}
            />
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            {retention.rows.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-ink-300">{label}</dt>
                <dd className="tabular-nums text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-8 border-t border-white/10 pt-6">
            <div>
              <p className="text-2xl font-semibold tabular-nums text-brand-500">
                {prevented.toLocaleString("de-DE", { maximumFractionDigits: 1 })}
              </p>
              <p className="text-xs text-ink-300">verhinderte Kündigungen pro Jahr</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-white">
                {euro(retentionTotal)}
              </p>
              <p className="text-xs text-ink-300">bei {employees} Mitarbeitenden</p>
            </div>
          </div>
        </article>

        {/* the reader picks what fits their operation */}
        <article className="rounded-2xl bg-white/5 p-8">
          <div className="flex flex-wrap gap-2">
            {secondaryLevers.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setLeverId(entry.id)}
                aria-pressed={entry.id === lever.id}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  entry.id === lever.id
                    ? "bg-brand-500 text-ink-900"
                    : "bg-white/10 text-ink-300 hover:text-white"
                }`}
              >
                {entry.tab}
              </button>
            ))}
          </div>

          <p className="mt-4 text-2xl font-semibold text-white">{lever.headline}</p>

          <div className="mt-7 border-t border-white/10 pt-6">
            <Slider
              label={lever.slider.label}
              value={leverValue}
              onChange={(value) =>
                setLeverValues((current) => ({ ...current, [lever.id]: value }))
              }
              min={lever.slider.min}
              max={lever.slider.max}
              step={lever.slider.step}
              unit={lever.slider.unit}
            />
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            {lever.rows.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-ink-300">{label}</dt>
                <dd className="tabular-nums text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-8 border-t border-white/10 pt-6">
            <div>
              <p className="text-2xl font-semibold text-brand-500">{lever.perUnit.value}</p>
              <p className="text-xs text-ink-300">{lever.perUnit.label}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-white">{euro(leverTotal)}</p>
              <p className="text-xs text-ink-300">
                {lever.scalesWithHeadcount ? `bei ${employees} Mitarbeitenden` : "im Fuhrpark"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

function Slider({ label, value, onChange, min, max, step, unit = "" }: SliderProps) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-ink-300">{label}</span>
        <span className="text-lg font-semibold tabular-nums text-white">
          {value}
          {unit && <span className="ml-0.5 text-sm font-normal text-ink-300">{unit}</span>}
        </span>
      </span>

      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        autoComplete="off"
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-brand-500"
      />
    </label>
  );
}
