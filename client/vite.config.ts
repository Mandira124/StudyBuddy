import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
<<<<<<< HEAD

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
=======
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
});
