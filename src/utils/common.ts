export function buildQueryString<T>(params?: T) {
  return params && Object.keys(params).length
    ? `?${new URLSearchParams(Object.entries(params)).toString()}`
    : "";
}
