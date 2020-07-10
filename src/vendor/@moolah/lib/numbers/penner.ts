type PennerEquation = (k: number) => number;

interface Penner {
  [Key: string]: PennerEquation;
}

const equation: Penner = {
  linear: (k) => k,
  quadraticIn: (k) => k * k,
  quadraticOut: (k) => k * (2 - k),
  quadraticInOut: (k) => (k < 0.5 ? 2 * k * k : -1 + (4 - 2 * k) * k),
  quinticInOut: (k) =>
    k < 0.5 ? 16 * k * k * k * k * k : 1 + 16 * --k * k * k * k * k,
};

export default equation;
