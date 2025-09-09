import "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $confetti: {
      start: (options?: Record<string, any>) => void;
      stop: () => void;
    };
  }
}
