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

/** {@link | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values} */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}
