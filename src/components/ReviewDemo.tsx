import { useState, type ReactNode } from "react";
import { Check, Minus, Clock, X, Camera } from "lucide-react";
import { reviewModule, reviewPeople, type Verdict } from "../data/review";

/**
 * Approval view from the portal, cut down to three columns: who, which
 * submission, and what came in. Clicking left changes what stands right.
 *
 * Deliberately left out compared to the product: filters, groups, date range,
 * module settings and pagination — none of them carry the argument.
 */
const verdictMark: Record<Verdict, { Icon: typeof Check; className: string }> = {
  approved: { Icon: Check, className: "text-emerald-500" },
  reduced: { Icon: Minus, className: "text-amber-500" },
  open: { Icon: Clock, className: "text-ink-300" },
};

function Column({
  title,
  note,
  children,
}: {
  title: string;
  /** Small aside on the same line — used once, for the demo disclaimer. */
  note?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-300">{title}</p>
        {note && <p className="text-xs text-ink-600">{note}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ReviewDemo() {
  const [personIndex, setPersonIndex] = useState(0);
  const [entryIndex, setEntryIndex] = useState(0);

  const person = reviewPeople[personIndex];
  const entry = person.entries[Math.min(entryIndex, person.entries.length - 1)];
  const mark = verdictMark[entry.verdict];

  const selectPerson = (index: number) => {
    setPersonIndex(index);
    setEntryIndex(0);
  };

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[14rem_14rem_1fr] lg:items-start">
      <Column title="Mitarbeitende">
        <ul className="mt-4 space-y-1.5">
          {reviewPeople.map((candidate, index) => (
            <li key={candidate.name}>
              <button
                type="button"
                onClick={() => selectPerson(index)}
                aria-pressed={index === personIndex}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  index === personIndex
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[0.6rem] font-semibold text-white">
                  {candidate.initials}
                </span>
                <span className="truncate">{candidate.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Column>

      <Column title="Abschlüsse">
        <ul className="mt-4 space-y-1.5">
          {person.entries.map((candidate, index) => {
            const candidateMark = verdictMark[candidate.verdict];
            const isActive = candidate === entry;

            return (
              <li key={candidate.period}>
                <button
                  type="button"
                  onClick={() => setEntryIndex(index)}
                  aria-pressed={isActive}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{candidate.period}</span>
                  <candidateMark.Icon
                    size={15}
                    strokeWidth={2.5}
                    className={candidateMark.className}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </Column>

      <Column title="Was eingereicht wurde" note="Vereinfachte Demo mit Beispieldaten">
        <div className="mt-4 grid gap-6 rounded-lg bg-white/5 p-5 sm:min-h-80 sm:grid-cols-[1fr_11rem]">
          <div>
            <p className="text-sm font-medium text-white">{reviewModule.name}</p>

            <ul className="mt-4 space-y-2">
              {entry.checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-ink-300">
                  {item.ok ? (
                    <Check size={14} strokeWidth={2.5} className="shrink-0 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <X size={14} strokeWidth={2.5} className="shrink-0 text-red-500" aria-hidden="true" />
                  )}
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/10 p-3">
              <Camera size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink-300" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-ink-300">{entry.photo}</p>
            </div>

            {entry.note && (
              <p className="mt-4 border-l-2 border-amber-500 pl-3 text-xs leading-relaxed text-ink-300">
                {entry.note}
              </p>
            )}
          </div>

          <dl className="space-y-4 text-xs sm:border-l sm:border-white/10 sm:pl-6">
            <div>
              <dt className="text-ink-300">Abgeschlossen am</dt>
              <dd className="mt-0.5 text-white">{entry.completedAt}</dd>
            </div>
            <div>
              <dt className="text-ink-300">Gutgeschriebene Punkte</dt>
              <dd className="mt-0.5 text-white">
                {entry.points} <span className="text-ink-300">von {reviewModule.maxPoints}</span>
              </dd>
            </div>
            <div>
              <dt className="text-ink-300">Belohnungsstatus</dt>
              <dd className={`mt-0.5 flex items-center gap-1.5 ${mark.className}`}>
                <mark.Icon size={14} strokeWidth={2.5} aria-hidden="true" />
                {entry.status}
              </dd>
            </div>
          </dl>
        </div>
      </Column>
    </div>
  );
}
