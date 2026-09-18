import { useEffect, useState } from "react";
import { navLinks, site } from "../data/site";
import LinkedInIcon from "./icons/LinkedInIcon";

/**
 * Sticky header. Transparent while the hero is in view, solid once scrolled.
 * An island because it needs scroll state, a mobile menu toggle and scrollspy.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Scrollspy: the section crossing the middle of the screen wins. */
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => section !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(href);
          else visible.delete(href);
        }

        const current = navLinks.find(({ href }) => visible.has(href));
        setActiveHref(current?.href ?? null);
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-lg font-semibold tracking-tight text-white">
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={activeHref === href ? "true" : undefined}
              className={`text-sm underline-offset-8 transition-colors ${
                activeHref === href
                  ? "text-white underline decoration-brand-500 decoration-2"
                  : "text-ink-300 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}

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
            href="#kontakt"
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-brand-600 hover:text-white"
          >
            Kostenlos testen
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          className="text-white md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 px-6 pb-6 md:hidden">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              aria-current={activeHref === href ? "true" : undefined}
              className={`block py-3 underline-offset-8 ${
                activeHref === href
                  ? "text-white underline decoration-brand-500 decoration-2"
                  : "text-ink-300 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}

          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 text-ink-300 hover:text-white"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>

          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-full bg-brand-500 px-5 py-2 text-center font-medium text-ink-900"
          >
            Kostenlos testen
          </a>
        </nav>
      )}
    </header>
  );
}
