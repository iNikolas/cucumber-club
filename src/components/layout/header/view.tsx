import { defineComponent } from "vue";

import DarkModeToggle from "@/components/ui/dark-mode-toggle";

import styles from "./styles.module.scss";

export default defineComponent({
  name: "AppHeader",
  setup() {
    return () => (
      <header class={styles.header}>
        <DarkModeToggle class={styles["dark-mode-toggle"]} />
        <div class={styles.logo}>
          <span class={styles.icon}>🥒</span>
          <span class={styles.title}>CucumbClub</span>
        </div>
        <p class={styles.tagline}>
          A place where cucumbers decide everything 🥒🚀
        </p>
      </header>
    );
  },
});
