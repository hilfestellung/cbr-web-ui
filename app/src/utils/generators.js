import { memoizeLRU, getHashcode } from './misc';

function rangeRaw(
  amount,
  start = 0,
  end = start + amount,
  step = (end - start) / amount
) {
  const result = [];
  for (let i = start, n = end; i < n; i = i + step) {
    result.push(i);
  }
  return result;
}
export const range = memoizeLRU(rangeRaw, 20, (...args) =>
  getHashcode(...args)
);

export const RANGE5 = range(5);
