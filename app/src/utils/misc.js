import memoize from 'lodash/memoize';
import { createKeyedNumberComparator } from './sort';

export const NOP = () => {};

export const hasValue = (value) => value != null && value !== '';

export function getHashcode(...args) {
  var hashCode = '';
  args.forEach((arg) => {
    if (typeof arg !== 'object') {
      hashCode += arg;
    } else {
      for (var prop in arg) {
        hashCode += prop + getHashcode(arg[prop]);
      }
    }
  });
  return hashCode;
}

export function memoizeLRU(func, capacity, resolver) {
  const result = memoize(func, resolver);
  //const saveGet = result.cache.get.bind(result.cache);
  const saveSet = result.cache.set.bind(result.cache);
  const comparator = createKeyedNumberComparator('updated', true);
  result.keyCache = [];
  result.cache.set = function lruSetter(key, value) {
    result.keyCache.push({ updated: Date.now(), key });
    result.keyCache.sort(comparator);
    if (result.keyCache.length > capacity) {
      const keyContainer = result.keyCache.pop();
      result.cache.delete(keyContainer.key);
    }
    return saveSet(key, value);
  };
  return result;
}
