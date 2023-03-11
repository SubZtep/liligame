/**
 * Returns a range-limited number {n} between {min} and {max}
 * @param n - Current Value
 * @param min - Minimum Value
 * @param max - Maximum Value
 * @returns Curry fn
 */
export function clamper(min: number, max: number) {
  return (n: number) => Math.min(Math.max(n, min), max)
}
