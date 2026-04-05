// shiftLogic.js
// Implements toroidal mesh circular shift logic for visualization

export const ShiftLogic = {
  validate(p, q) {
    const errs = [];
    if (!Number.isInteger(p) || p < 4 || p > 64) errs.push("p must be 4–64");
    const s = Math.sqrt(p);
    if (!Number.isInteger(s)) errs.push("p must be a perfect square");
    if (!Number.isInteger(q) || q < 1 || q >= p) errs.push(`q must be 1–${p-1}`);
    return errs;
  },

  amounts(p, q) {
    const sqrtP = Math.sqrt(p);
    const rowShift = q % sqrtP;
    const colShift = Math.floor(q / sqrtP);
    const meshSteps = rowShift + colShift;
    const ringSteps = Math.min(q, p - q);
    return { sqrtP, rowShift, colShift, meshSteps, ringSteps };
  },

  initial(p) {
    return Array.from({length: p}, (_, i) => i);
  },

  applyRow(nodes, p, rowShift) {
    const s = Math.sqrt(p);
    const out = [...nodes];
    for (let r = 0; r < s; r++) {
      for (let c = 0; c < s; c++) {
        out[r * s + (c + rowShift) % s] = nodes[r * s + c];
      }
    }
    return out;
  },

  applyCol(nodes, p, colShift) {
    const s = Math.sqrt(p);
    const out = [...nodes];
    for (let c = 0; c < s; c++) {
      for (let r = 0; r < s; r++) {
        out[((r + colShift) % s) * s + c] = nodes[r * s + c];
      }
    }
    return out;
  },

  verify(finalNodes, p, q) {
    // After shift: value that was at pos i should now be at (i + q) % p
    return finalNodes.every((val, pos) => {
      const expectedPos = (val + q) % p;
      return expectedPos === pos;
    });
  }
};