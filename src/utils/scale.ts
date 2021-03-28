import { clamp } from './clamp';

export const scale = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
  shouldClamp = true
): number => {
  const res = ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return shouldClamp ? clamp(res, out_min, out_max) : res;
};
