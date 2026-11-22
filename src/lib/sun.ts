/**
 * Simple time-of-day helper for the Hero's background gradient.
 * The Hero shifts palette gently as the day passes — dawn → day →
 * golden hour → dusk → night. Everything stays light-themed.
 */

export type TimeOfDay = "night" | "dawn" | "day" | "golden" | "dusk";

export function getTimeOfDay(now: Date): TimeOfDay {
  const h = now.getHours() + now.getMinutes() / 60;
  if (h < 6 || h > 19) return "night";
  if (h < 7)           return "dawn";
  if (h < 16.5)        return "day";
  if (h < 17.5)        return "golden";
  return "dusk";
}
