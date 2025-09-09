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
    onAddCucumber: {
      type: Function as PropType<(id: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const displayScore = ref(props.data.score);

    watch(
      () => props.data.score,
      (newScore, oldScore) => {
        if (newScore > oldScore) {
          let current = oldScore;
          const step = () => {
            if (current < newScore) {
              current += 1;
              displayScore.value = current;
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        } else {
          displayScore.value = newScore;
        }
      }
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
        <button class={styles["add-btn"]} onClick={handleAddCucumber}>
          Add Cucumber
        </button>
      </div>
    );
  },
});
