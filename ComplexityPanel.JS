// ComplexityPanel component
// Renders the bar/line chart comparing mesh vs ring steps.
// Full implementation in index.html using Chart.js.

export function computeComplexityData(p) {
  const sqrtP = Math.sqrt(p);
  const qVals = Array.from({ length: p - 1 }, (_, i) => i + 1);
  return qVals.map(q => ({
    q,
    rowShift:  q % sqrtP,
    colShift:  Math.floor(q / sqrtP),
    meshSteps: (q % sqrtP) + Math.floor(q / sqrtP),
    ringSteps: Math.min(q, p - q),
  }));
}