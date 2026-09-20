import { useState } from "react";
import {
  ListChecks,
  Star,
  ThumbsUp,
  ThumbsDown,
  Type,
  ChevronDown,
  CalendarDays,
  Link2,
  Image as ImageIcon,
  ImagePlus,
  Plus,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  SignalHigh,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { pointRate } from "../data/rewards";

/**
 * Island: a small version of the wizard's "Modulaufbau" tab from the portal —
 * blocks on the left, phone in the middle, settings for the selected block on
 * the right. The previews mirror what the real editor draws, so the page
 * cannot promise a different product.
 *
 * Add and reorder by button, not by dragging: the real editor drags because
 * modules there get long, but dragging fails on touch and with a keyboard.
 */
type BlockId =
  | "checklist"
  | "photo"
  | "stars"
  | "thumbs"
  | "text"
  | "dropdown"
  | "date"
  | "link";

type AnswerType = "single" | "multiple" | "decline";

interface Block {
  uid: number;
  id: BlockId;
  required: boolean;
  answerType: AnswerType;
  /** Checklist and dropdown entries; edited in the settings column. */
  items: string[];
  /** Link block: button label, and where the button leads. */
  linkLabel: string;
  linkUrl: string;
}

/** Both the checklist and the dropdown are lists of entries, as in the portal. */
const defaultItems: Partial<Record<BlockId, string[]>> = {
  checklist: ["Gurte gespannt", "Kanten geschützt", "Ladung formschlüssig"],
  dropdown: ["MUC-AB 123", "MUC-CD 456", "MUC-EF 789"],
};

const hasItems = (id: BlockId) => id === "checklist" || id === "dropdown";

const linkDefaults = {
  linkLabel: "",
  linkUrl: "https://intranet.example.de/ladungssicherung",
};

const catalogue: {
  id: BlockId;
  label: string;
  Icon: typeof Star;
  help: string;
}[] = [
  {
    id: "checklist",
    label: "Checkliste",
    Icon: ListChecks,
    help: "Nutzer wählen Einträge einer Checkliste aus.",
  },
  {
    id: "stars",
    label: "Sternebewertung",
    Icon: Star,
    help: "Nutzer geben eine Bewertung zwischen 0 und 5 Sternen ab.",
  },
  {
    id: "thumbs",
    label: "Daumenbewertung",
    Icon: ThumbsUp,
    help: "Nutzer geben eine Bewertung mit Daumen hoch oder Daumen runter ab.",
  },
  {
    id: "photo",
    label: "Fotodokumentation",
    Icon: ImageIcon,
    help: "Der Nutzer wird aufgefordert, ein Bild aufzunehmen – auf Wunsch mehrere, die zu einem PDF zusammengefügt werden.",
  },
  {
    id: "text",
    label: "Textfeld",
    Icon: Type,
    help: "Der Nutzer gibt eine freie Textantwort ein.",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    Icon: ChevronDown,
    help: "Der Nutzer wählt genau einen Eintrag aus einer Auswahlliste.",
  },
  {
    id: "date",
    label: "Datum",
    Icon: CalendarDays,
    help: "Der Nutzer wählt ein Datum aus.",
  },
  {
    id: "link",
    label: "Verlinkung",
    Icon: Link2,
    help: "Zeigt dem Nutzer einen Button, der zu einer Seite oder zu einem Dienstmodul führt.",
  },
];

const answerTypes: { value: AnswerType; label: string }[] = [
  { value: "single", label: "Einzelauswahl" },
  { value: "multiple", label: "Mehrfachauswahl" },
  { value: "decline", label: "Mehrfachauswahl mit Ablehnen" },
];

const labelOf = (id: BlockId) => catalogue.find((entry) => entry.id === id)!;

const startBlocks: Block[] = [
  {
    uid: 1,
    id: "checklist",
    required: true,
    answerType: "single",
    items: defaultItems.checklist!,
    ...linkDefaults,
  },
  {
    uid: 2,
    id: "photo",
    required: false,
    answerType: "single",
    items: [],
    ...linkDefaults,
  },
];

export default function TaskBuilder() {
  const [blocks, setBlocks] = useState<Block[]>(startBlocks);
  const [selected, setSelected] = useState<number | null>(1);
  const [reward, setReward] = useState(40);
  const [nextUid, setNextUid] = useState(3);
  /* Named like the wizard's general tab, so the page teaches the real structure. */
  const [name, setName] = useState("Ladungssicherung prüfen");
  const [description, setDescription] = useState("Vor jeder Tour · Fuhrpark");

  const add = (id: BlockId) => {
    const block: Block = {
      uid: nextUid,
      id,
      required: false,
      answerType: "single",
      items: defaultItems[id] ?? [],
      ...linkDefaults,
    };
    setBlocks((current) => [...current, block]);
    setSelected(nextUid);
    setNextUid((current) => current + 1);
  };

  const remove = (uid: number) => {
    setBlocks((current) => current.filter((block) => block.uid !== uid));
    setSelected((current) => (current === uid ? null : current));
  };

  const move = (index: number, direction: -1 | 1) =>
    setBlocks((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;

      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const update = (uid: number, patch: Partial<Block>) =>
    setBlocks((current) =>
      current.map((block) =>
        block.uid === uid ? { ...block, ...patch } : block,
      ),
    );

  const reset = () => {
    setBlocks(startBlocks);
    setSelected(1);
  };

  const active = blocks.find((block) => block.uid === selected) ?? null;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_17rem_15rem] lg:items-start">
      {/* left: the catalogue */}
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-300">
          Bausteine
        </p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {catalogue.map(({ id, label, Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => add(id)}
                className="flex w-full items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 text-left text-sm text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon
                  size={16}
                  strokeWidth={1.75}
                  className="shrink-0"
                  aria-hidden="true"
                />
                <span className="flex-1">{label}</span>
                <Plus
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 text-brand-500"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-lg bg-white/5 p-5">
          <label className="block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-ink-300">
                Belohnung · Währung Punkte
              </span>
              <span className="text-lg font-semibold tabular-nums text-white">
                {reward}
                <span className="ml-2 text-sm font-normal text-brand-500">
                  = {(reward / pointRate.points).toFixed(2).replace(".", ",")} €
                </span>
              </span>
            </span>
            <input
              type="range"
              min={10}
              max={200}
              step={10}
              value={reward}
              autoComplete="off"
              onChange={(event) => setReward(Number(event.target.value))}
              className="mt-3 w-full accent-brand-500"
            />
          </label>
        </div>
      </div>

      {/* middle: what the employee sees */}
      <div>
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-300">
            Vorschau
          </p>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1 text-xs text-ink-300 transition-colors hover:text-white"
          >
            <RotateCcw size={12} strokeWidth={2} aria-hidden="true" />
            zurücksetzen
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-4xl border-[6px] border-ink-900 bg-white shadow-sm">
          {/* same frame as the app demo further up the page */}
          <div className="relative flex items-center justify-between px-4 pt-2 pb-1">
            <span className="text-[0.7rem] font-semibold text-ink-900">
              9:41
            </span>

            <span
              aria-hidden="true"
              className="absolute top-1.5 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-ink-900"
            />

            <span className="flex items-center gap-1 text-ink-900">
              <SignalHigh size={12} strokeWidth={2.5} aria-hidden="true" />
              <Wifi size={12} strokeWidth={2.5} aria-hidden="true" />
              <BatteryFull size={14} strokeWidth={2} aria-hidden="true" />
            </span>
          </div>

          <div className="border-b border-ink-100 px-4 py-3">
            <p className="text-[0.8rem] font-semibold break-words text-ink-900">
              {name || "Ohne Namen"}
            </p>
            <p className="mt-0.5 text-[0.65rem] break-words text-ink-600">
              {description}
            </p>
          </div>

          <div className="h-100 space-y-2 overflow-y-auto px-3 py-3">
            {blocks.length === 0 && (
              <p className="pt-12 text-center text-[0.7rem] text-ink-600">
                Wählen Sie links einen Baustein.
              </p>
            )}

            {blocks.map((block, index) => (
              <div
                key={block.uid}
                onClick={() => setSelected(block.uid)}
                className={`rounded-lg border p-2.5 transition-colors ${
                  block.uid === selected
                    ? "border-brand-500 bg-brand-100/40"
                    : "border-transparent hover:border-ink-100"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <BlockPreview block={block} />
                  </div>

                  <div className="flex shrink-0 flex-col gap-0.5 text-ink-900">
                    <IconButton
                      label="nach oben"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                    >
                      <ArrowUp size={11} strokeWidth={2} aria-hidden="true" />
                    </IconButton>
                    <IconButton
                      label="nach unten"
                      onClick={() => move(index, 1)}
                      disabled={index === blocks.length - 1}
                    >
                      <ArrowDown size={11} strokeWidth={2} aria-hidden="true" />
                    </IconButton>
                    <IconButton
                      label="entfernen"
                      onClick={() => remove(block.uid)}
                      className="text-red-600"
                    >
                      <X size={11} strokeWidth={2} aria-hidden="true" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* the app closes a module with two buttons; their labels are set in
              the wizard's general tab, so no points appear here */}
          <div className="flex gap-2 border-t border-ink-100 p-3">
            <div className="flex-1 rounded-full border border-ink-300 py-2 text-center text-[0.75rem] font-medium text-ink-800">
              Abbrechen
            </div>
            <div className="flex-1 rounded-full bg-brand-500 py-2 text-center text-[0.75rem] font-medium text-white">
              OK
            </div>
          </div>
        </div>
      </div>

      {/* right: settings for the selected block */}
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-300">
          Einstellungen
        </p>

        {/* the module itself, always editable */}
        <div className="mt-4 space-y-3 border-b border-white/10 pb-5">
          <label className="block">
            <span className="text-xs text-ink-300">Modulname</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-xs text-ink-300">
              Beschreibung für Mitarbeiter
            </span>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-1 w-full rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </label>
        </div>

        {!active ? (
          <p className="mt-5 text-sm text-ink-300">
            Wählen Sie in der Vorschau einen Baustein aus.
          </p>
        ) : (
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-medium text-white">
                {labelOf(active.id).label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-300">
                {labelOf(active.id).help}
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-2 text-xs text-ink-300">
              <input
                type="checkbox"
                checked={active.required}
                onChange={(event) =>
                  update(active.uid, { required: event.target.checked })
                }
                className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand-500"
              />
              Pflicht bei Abschluss durch Mitarbeiter
            </label>

            {active.id === "checklist" && (
              <div>
                <p className="text-xs text-ink-300">Antworttyp</p>
                <div className="mt-2 space-y-1">
                  {answerTypes.map(({ value, label }) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-2 text-xs text-ink-300"
                    >
                      <input
                        type="radio"
                        name={`answer-type-${active.uid}`}
                        checked={active.answerType === value}
                        onChange={() =>
                          update(active.uid, { answerType: value })
                        }
                        className="h-3.5 w-3.5 shrink-0 accent-brand-500"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {active.id === "link" && (
              <>
                <label className="block">
                  <span className="text-xs text-ink-300">Button Text</span>
                  <input
                    value={active.linkLabel}
                    placeholder="Link öffnen"
                    onChange={(event) =>
                      update(active.uid, { linkLabel: event.target.value })
                    }
                    className="mt-1 w-full rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white placeholder:text-ink-600 focus:border-brand-500 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-ink-300">Ziel</span>
                  <input
                    value={active.linkUrl}
                    placeholder="https://…"
                    onChange={(event) =>
                      update(active.uid, { linkUrl: event.target.value })
                    }
                    className="mt-1 w-full rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white placeholder:text-ink-600 focus:border-brand-500 focus:outline-none"
                  />
                </label>
              </>
            )}

            {hasItems(active.id) && (
              <div>
                <p className="text-xs text-ink-300">Einträge</p>

                {/* Only the entries scroll: the settings above them stay put,
                      and a long checklist no longer stretches the section. */}
                <ul className="scrollbar-custom mt-2 max-h-44 space-y-1.5 overflow-y-auto pr-2">
                  {active.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                      <input
                        value={item}
                        aria-label={`Eintrag ${index + 1}`}
                        onChange={(event) =>
                          update(active.uid, {
                            items: active.items.map((entry, position) =>
                              position === index ? event.target.value : entry,
                            ),
                          })
                        }
                        className="min-w-0 flex-1 rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white focus:border-brand-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        aria-label={`Eintrag ${index + 1} entfernen`}
                        onClick={() =>
                          update(active.uid, {
                            items: active.items.filter(
                              (_, position) => position !== index,
                            ),
                          })
                        }
                        className="shrink-0 text-red-500 transition-colors hover:text-emerald-500"
                      >
                        <X size={12} strokeWidth={2} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    update(active.uid, {
                      items: [...active.items, "Neuer Eintrag"],
                    })
                  }
                  className="mt-2 flex items-center gap-1 text-xs text-brand-500 transition-colors hover:text-brand-600"
                >
                  <Plus size={12} strokeWidth={2} aria-hidden="true" />
                  Hinzufügen
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled = false,
  className = "",
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      /* green on hover, so every control answers the same way */
      className={`rounded p-0.5 transition-colors hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-inherit ${className}`}
    >
      {children}
    </button>
  );
}

/** Mirrors the previews the portal editor draws for each block. */
function BlockPreview({ block }: { block: Block }) {
  const mark = block.required ? (
    <span className="text-brand-600"> *</span>
  ) : null;
  const field =
    "flex h-8 items-center rounded-md border border-ink-300/60 px-2 text-[0.65rem] text-ink-600";

  switch (block.id) {
    case "checklist": {
      const items = block.items;

      if (items.length === 0) {
        return (
          <p className="text-[0.65rem] text-ink-600">Noch kein Eintrag.</p>
        );
      }

      return (
        <ul className="space-y-1.5">
          {items.map((item, index) => {
            if (block.answerType === "decline") {
              return (
                <li
                  key={index}
                  className="flex items-center gap-2 text-[0.7rem] text-ink-900"
                >
                  <span className="flex-1 truncate">{item}</span>
                  <X
                    size={12}
                    strokeWidth={2}
                    className="text-ink-600"
                    aria-hidden="true"
                  />
                  <Check
                    size={12}
                    strokeWidth={2}
                    className="text-ink-600"
                    aria-hidden="true"
                  />
                </li>
              );
            }

            const shape =
              block.answerType === "multiple" ? "rounded-sm" : "rounded-full";

            return (
              <li
                key={index}
                className="flex items-center gap-2 text-[0.7rem] text-ink-900"
              >
                <span
                  className={`h-3.5 w-3.5 shrink-0 border ${shape} ${
                    index === 0
                      ? "border-brand-500 bg-brand-500"
                      : "border-ink-300"
                  }`}
                />
                <span className="truncate">
                  {item}
                  {index === 0 && mark}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }

    case "stars":
      return (
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={16}
              strokeWidth={1.5}
              className="text-ink-800"
              aria-hidden="true"
            />
          ))}
          {mark}
        </div>
      );

    case "thumbs":
      return (
        <div className="flex items-center gap-3 text-ink-800">
          <ThumbsUp size={16} strokeWidth={1.5} aria-hidden="true" />
          <ThumbsDown size={16} strokeWidth={1.5} aria-hidden="true" />
          {mark}
        </div>
      );

    case "photo":
      return (
        <div className="flex items-center gap-2 rounded-2xl border border-ink-300/60 px-3 py-4 text-[0.7rem] text-ink-900">
          <ImagePlus size={16} strokeWidth={1.75} aria-hidden="true" />
          Bild aufnehmen
          {mark}
        </div>
      );

    case "text":
      return <div className={field}>{mark}</div>;

    case "dropdown":
      return (
        <div className={`${field} justify-between`}>
          <span className="truncate">
            {block.items[0] ?? "Ohne Eintrag"}
            {mark}
          </span>
          <ChevronDown
            size={12}
            strokeWidth={2}
            className="shrink-0"
            aria-hidden="true"
          />
        </div>
      );

    case "date":
      return (
        <div className={`${field} justify-between`}>
          <span>tt.mm.jjjj{mark}</span>
          <CalendarDays size={12} strokeWidth={2} aria-hidden="true" />
        </div>
      );

    case "link":
      return (
        <div className="inline-flex max-w-full items-center rounded-md border border-ink-300/60 px-3 py-1.5 text-[0.7rem] text-ink-900">
          <span className="truncate">{block.linkLabel || "Link öffnen"}</span>
        </div>
      );
  }
}
