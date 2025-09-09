import { defineComponent, type PropType, ref, watch } from "vue";

import type { User } from "@/entities";

import styles from "./styles.module.scss";

export default defineComponent({
  name: "UserCard",
  props: {
    data: {
      type: Object as PropType<User>,
      required: true,
    },
    isUpdating: {
      type: Boolean,
      required: true,
    },
    onAddCucumber: {
      type: Function as PropType<(id: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const displayScore = ref(props.data.score);

    watch(
      () => props.data.score,
      (newScore, oldScore = 0) => {
        if (newScore !== oldScore) {
          const duration = 500;
          const start = performance.now();

          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            displayScore.value = Math.round(
              oldScore + (newScore - oldScore) * progress
            );

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { immediate: true }
    );

    const handleAddCucumber = () => {
      props.onAddCucumber(props.data.id);
    };

    return () => (
      <div class={styles["user-card"]}>
        <img
          src={props.data.avatar}
          alt={props.data.name}
          class={styles["user-avatar"]}
        />
        <div class={styles["user-info"]}>
          <h3 class={styles["user-name"]}>{props.data.name}</h3>
          <p class={styles["user-score"]}>🥒 {displayScore.value}</p>
        </div>
        <button
          disabled={props.isUpdating}
          class={styles["add-btn"]}
          onClick={handleAddCucumber}
        >
          Add Cucumber
        </button>
      </div>
    );
  },
});
