export function getLocalItem(key: string, defaultValue?: any): any {
  const result = localStorage.getItem(key);
  if (result != null) {
    return JSON.parse(result);
  }
  return defaultValue;
}

export function setLocalItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getSessionItem(key: string, defaultValue?: any): any {
  const result = sessionStorage.getItem(key);
  if (result != null) {
    return JSON.parse(result);
  }
  return defaultValue;
}

export function setSessionItem(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
