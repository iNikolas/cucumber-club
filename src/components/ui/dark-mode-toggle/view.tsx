import { defineComponent, onMounted, ref, watch, useAttrs } from "vue";
import styles from "./styles.module.scss";

export default defineComponent({
  name: "DarkModeToggle",
  setup() {
    const darkMode = ref(false);
    const attrs = useAttrs();

    onMounted(() => {
      const saved = localStorage.getItem("dark-mode");
      if (saved === "true") {
        darkMode.value = true;
        document.documentElement.setAttribute("data-theme", "dark");
      }
    });

    watch(darkMode, (value) => {
      document.documentElement.setAttribute(
        "data-theme",
        value ? "dark" : "light"
      );
      localStorage.setItem("dark-mode", value.toString());
    });

    const toggleMode = () => {
      darkMode.value = !darkMode.value;
    };

    return () => (
      <div
        {...attrs}
        class={[
          styles.modeToggle,
          darkMode.value ? styles.toggled : "",
          attrs.class,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={toggleMode}
      >
        <div class={styles.toggle}>
          <div class={styles.darkMode} />
        </div>
      </div>
    );
  },
});
