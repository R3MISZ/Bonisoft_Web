import { useEffect, useRef, useState } from "react";

/**
 * Counts from the previous value to the current one. The first run waits until
 * the number is on screen, so the reader sees it happen instead of missing it.
 * With prefers-reduced-motion the value simply appears.
 */
export function useCountUp(value: number, duration = 700) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);
  /* Where the next run starts — the figure currently on screen. */
  const from = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setShown(value);
      return;
    }

    const origin = from.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      /* ease-out: quick off the mark, settles on the figure */
      const eased = 1 - (1 - progress) ** 3;
      const current = origin + (value - origin) * eased;

      from.current = current;
      setShown(current);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, duration]);

  return { ref, shown };
}
