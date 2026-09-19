/**
 * Logo files in `public/brand/`, served as-is, so the path is the file name.
 *
 *   signet          the mark on its own, square — for tight spots
 *   wordmarkLight   mark plus wordmark with white text, for dark backgrounds
 *   wordmarkDark    the same with black text, for light backgrounds
 *
 * The wordmark is 503 × 109, so roughly 4.6 : 1 — set a height and let the
 * width follow, never the other way round.
 */
export const brand = {
  signet: "/brand/Bonisoft__signet_iceblue.svg",
  wordmarkLight: "/brand/Bonisoft_logo_iceblue_text_white.svg",
  wordmarkDark: "/brand/Bonisoft_logo_iceblue_text_black.svg",
} as const;
