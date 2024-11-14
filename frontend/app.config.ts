import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8080",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path: any) => path.replace(/^\/api/, ""),
        },
      },
    },
    optimizeDeps: {
      // Add both @codemirror/state and @codemirror/view to included deps to optimize
      include: [
        "@codemirror/state",
        "@codemirror/view",
        "@codemirror/commands",
        "@codemirror/lang-json",
      ],
    },
  },
  server: {
    experimental: {
      websocket: true,
    },
  },
}).addRouter({
  name: "ws",
  type: "http",
  handler: "./src/ws.ts",
  target: "server",
  base: "/ws",
});
