export function complexClassNameBuilder(source) {
  if (typeof source === 'function') {
    return source();
  }
  if (typeof source === 'object') {
    return Object.keys(source)
      .filter((key) => {
        const entry = source[key];
        if (typeof entry === 'function') {
          return !!entry();
        }
        if (typeof entry === 'boolean') {
          return entry;
        }
        return !!entry;
      })
      .join(' ');
  }
  return source;
}
