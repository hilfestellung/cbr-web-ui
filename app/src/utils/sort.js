import memoize from 'lodash/memoize';

function stringComparatorAscending(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

function stringComparatorDescending(a, b) {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  }
  return 0;
}

export function createStringComparator(descending) {
  if (descending) {
    return stringComparatorDescending;
  }
  return stringComparatorAscending;
}

function numberComparatorAscending(a, b) {
  return a - b;
}

function numberComparatorDescending(a, b) {
  return b - a;
}

export function createNumberComparator(descending) {
  if (descending) {
    return numberComparatorDescending;
  }
  return numberComparatorAscending;
}

function keyedNumberComparatorAscending(key) {
  return (a, b) => {
    if (a[key] && b[key]) {
      return a[key] - b[key];
    }
    return 0;
  };
}

function keyedNumberComparatorDescending(key) {
  return (a, b) => {
    if (a[key] && b[key]) {
      return b[key] - a[key];
    }
    return 0;
  };
}

export const createKeyedNumberComparator = memoize(
  function createKeyedNumberComparatorRaw(key, descending) {
    if (descending) {
      return keyedNumberComparatorDescending(key);
    }
    return keyedNumberComparatorAscending(key);
  },
  (key, descending) => key + '_' + !!descending
);
