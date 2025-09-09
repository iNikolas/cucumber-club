import { getCurrentInstance } from "vue";

export function buildQueryString<T>(params?: T) {
  return params && Object.keys(params).length
    ? `?${new URLSearchParams(Object.entries(params)).toString()}`
    : "";
}

export function showConfetti(timeMs = 5000) {
  const vm = getCurrentInstance();

  vm?.proxy?.$confetti.start();

  setTimeout(() => {
    vm?.proxy?.$confetti.stop();
  }, timeMs);
}
