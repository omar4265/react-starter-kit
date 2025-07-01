import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    allowedHosts: [
      'localhost',
      '2530-2001-16a2-7c30-6900-91d5-1cd7-e2ca-88a0.ngrok-free.app'  // your ngrok domain
    ]
  }
});
