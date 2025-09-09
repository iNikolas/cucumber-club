import { defineComponent } from "vue";

import HomePage from "@/pages/home";

export default defineComponent({
  name: "App",
  setup() {
    return () => (
      <main>
        <HomePage />
      </main>
    );
  },
});
