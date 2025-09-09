import { defineComponent, type PropType } from "vue";
import type { User } from "@/entities";

import styles from "./styles.module.scss";

export default defineComponent({
  name: "CucumberChampion",
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
    const handleAddCucumber = () => {
      props.onAddCucumber(props.data.id);
    };

    return () =>
      props.data ? (
        <div class={styles["champion"]}>
          <div class={styles["champion-crown"]}>🥇</div>

          <img
            src={props.data.avatar}
            alt={props.data.name}
            class={styles["champion-avatar"]}
          />

          <div class={styles["champion-info"]}>
            <h2 class={styles["champion-title"]}>Cucumber Champion</h2>
            <p class={styles["champion-name"]}>{props.data.name}</p>
            <p class={styles["champion-score"]}>
              🥒 The number of cucumbers eaten in a lifetime: {props.data.score}
            </p>
          </div>

          <button
            disabled={Boolean(props.isUpdating)}
            class={styles["add-btn"]}
            onClick={handleAddCucumber}
          >
            Add cucumber
          </button>
        </div>
      ) : null;
  },
});
