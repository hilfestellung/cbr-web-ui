export function getLocalItem(key, defaultValue) {
  const result = localStorage.getItem(key);
  if (result != null) {
    return JSON.parse(result);
  }
  return defaultValue;
}

export function setLocalItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getSessionItem(key, defaultValue) {
  const result = sessionStorage.getItem(key);
  if (result != null) {
    return JSON.parse(result);
  }
  return defaultValue;
}

export function setSessionItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
