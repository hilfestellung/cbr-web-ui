export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const fileReader = new FileReader();
    fileReader.onerror = (err) => {
      reject(err);
    };
    fileReader.onload = (event) => {
      resolve(event.target.result);
    };
    fileReader.readAsText(file);
  });
}

export function determineMinMax(values) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let hasValue = false;
  values.forEach((element) => {
    if (!isNaN(element)) {
      min = Math.min(min, element);
      max = Math.max(max, element);
      hasValue = true;
    }
  });
  if (hasValue) {
    return { min, max };
  }
  return { min: '', max: '' };
}
