import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import AppHeader from "./components/layout/header";

export default defineComponent({
  name: "App",
  setup() {
    return () => (
      <div>
        <AppHeader />
        <main class="main">
          <RouterView />
        </main>
      </div>
    );
  },
});
