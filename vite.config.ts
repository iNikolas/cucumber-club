import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tsconfigPaths from "vite-tsconfig-paths";
import circleDependency from "vite-plugin-circular-dependency";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), vueJsx(), vue(), circleDependency()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src/assets/styles"),
    },
  },
});
