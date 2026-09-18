import { useState } from "react";
import { contactEndpoint, headcountOptions } from "../data/site";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

/**
 * Island: the contact form. Four fields only — everything else can be asked
 * in the follow-up call.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (form: HTMLFormElement) => {
    if (!contactEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-ink-600 focus:border-brand-500 focus:outline-none";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit(event.currentTarget);
      }} className="rounded-2xl bg-white/5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-ink-300">Name *</span>
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>

        <label className="block">
          <span className="text-sm text-ink-300">Unternehmen *</span>
          <input name="company" required autoComplete="organization" className={fieldClass} />
        </label>

        <label className="block">
          <span className="text-sm text-ink-300">E-Mail *</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>

        <label className="block">
          <span className="text-sm text-ink-300">Mitarbeitende</span>
          <select name="headcount" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {headcountOptions.map((option) => (
              <option key={option} value={option} className="text-ink-900">
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full bg-brand-500 px-7 py-3 font-medium text-ink-900 transition-colors hover:bg-brand-600 hover:text-white disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Wird gesendet …" : "Kostenlos testen"}
      </button>

      <p aria-live="polite" className="mt-4 text-sm">
        {status === "unconfigured" && (
          <span className="text-brand-500">
            Der Formular-Endpunkt ist noch nicht angebunden – siehe contactEndpoint in site.ts.
          </span>
        )}
        {status === "sent" && (
          <span className="text-brand-500">Danke, wir melden uns innerhalb von 24 Stunden.</span>
        )}
        {status === "error" && (
          <span className="text-brand-500">
            Das hat nicht geklappt. Schreiben Sie uns gern direkt per E-Mail.
          </span>
        )}
        {status === "idle" && (
          <span className="text-ink-600">
            Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
          </span>
        )}
      </p>
    </form>
  );
}
