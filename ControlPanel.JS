// ControlPanel component
// Handles p and q input validation and emits change events.
// Full implementation in index.html.

export const VALID_P_VALUES = [4, 9, 16, 25, 36, 49, 64];

export function validateP(p) {
  if (!Number.isInteger(p) || p < 4 || p > 64) return 'p must be 4–64';
  if (!VALID_P_VALUES.includes(p)) return 'p must be a perfect square';
  return null;
}

export function validateQ(q, p) {
  if (!Number.isInteger(q) || q < 1 || q >= p) return `q must be 1–${p-1}`;
  return null;
}