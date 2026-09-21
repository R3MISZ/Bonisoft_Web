import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { legalLinks, navLinks, site } from "../data/site";
import { brand } from "../data/brand";
import LinkedInIcon from "./icons/LinkedInIcon";

interface Props {
  /**
   * Put in front of every section link. Empty on the landing page, "/" on the
   * legal pages, where "#realitaet" alone would point at nothing.
   */
  base?: string;
  /** The page being shown, so the menu can mark it. Comes from Astro. */
  currentPath?: string;
}

/**
 * Sticky header. Transparent while the hero is in view, solid once scrolled.
 *
 * The bar carries one entry, "Home", which opens the sections as a dropdown —
 * the same menu at every width, so there is no separate burger.
 * An island because it needs scroll state, the menu and scrollspy.
 */
export default function Nav({ base = "", currentPath = "" }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Close on Escape or on a click outside — expected of any dropdown. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  /** Scrollspy: the section crossing the middle of the screen wins. */
  useEffect(() => {
    const owned: [string, string[]][] = navLinks.map((link) => [
      link.href,
      [link.href],
    ]);

    const sections = owned
      .flatMap(([, selectors]) => selectors)
      .map((selector) => document.querySelector(selector))
      .filter((section): section is Element => section !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const selector = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(selector);
          else visible.delete(selector);
        }

        /* Searched from the bottom up: "Incentive Engine" sits inside the
           Aktionsmodule section, and the more specific entry should win. */
        const current = [...owned].reverse().find(([, selectors]) =>
          selectors.some((selector) => visible.has(selector)),
        );
        setActiveHref(current?.[0] ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-ink-900/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      {/* three tracks so "Home" sits in the middle of the bar, not beside the logo */}
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-6 py-4">
        <a href={base || "#top"} aria-label={site.name} className="justify-self-start">
          <img src={brand.wordmarkLight} alt={site.name} className="h-7 w-auto" />
        </a>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            className="flex items-center gap-1.5 text-sm text-white underline decoration-brand-500 decoration-2 underline-offset-8"
          >
            Home
            <ChevronDown
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* max-h: the list is long enough to reach past the fold on a small phone. */}
          {menuOpen && (
            <nav className="absolute top-full left-1/2 mt-3 max-h-[calc(100vh-6rem)] w-56 -translate-x-1/2 overflow-y-auto rounded-xl border border-white/10 bg-ink-900 p-2 shadow-sm">
              {/*
                Top of the landing page. On a legal page that means leaving it,
                which is the whole reason the entry is here.
              */}
              <a
                href={base || "#top"}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Startseite
              </a>

              <p className="mt-2 border-t border-white/10 px-3 pt-3 pb-1 text-xs font-semibold tracking-[0.18em] text-ink-600 uppercase">
                Abschnitte
              </p>

              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={base + href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeHref === href ? "true" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeHref === href
                      ? "bg-white/10 text-white"
                      : "text-ink-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              ))}

              {/*
                The legal pages leave the landing page, so they sit apart from
                the sections rather than mixed in among them.
              */}
              <p className="mt-2 border-t border-white/10 px-3 pt-3 pb-1 text-xs font-semibold tracking-[0.18em] text-ink-600 uppercase">
                Rechtliches
              </p>

              {legalLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={href === currentPath ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    href === currentPath
                      ? "bg-white/10 text-white"
                      : "text-ink-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bonisoft auf LinkedIn"
            className="text-ink-300 transition-colors hover:text-white"
          >
            <LinkedInIcon />
          </a>

          <a
            href={`${base}#kontakt`}
            className="whitespace-nowrap rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-brand-600 hover:text-white sm:px-5"
          >
            {/* the long label would push "Home" off centre on a phone */}
            <span className="sm:hidden">Testen</span>
            <span className="hidden sm:inline">Kostenlos testen</span>
          </a>
        </div>
      </div>
    </header>
  );
}
