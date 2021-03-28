export const clamp = function (nr: number, min: number, max: number): number {
  if (min > max) {
    const temp = max;
    max = min;
    min = temp;
  }
  return Math.min(Math.max(nr, min), max) || 0;
};
