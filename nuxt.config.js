export default {
  target: "static",
  env: {
    backEndURL: process.env.BACK_END_URL || "http://localhost",
    // backEndPort: process.env.BACK_END_PORT || 3001,
  },
  server: {
    port: process.env.PORT,
  },
  plugins: [{ src: "~/plugins/trading-vue.client.js", mode: "client" }],
  head: {
    title: "Realtime Stock and Crypto Charts",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=0.4" },
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
      },
    ],
    script: [
      {
        src:
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js",
      },
    ],
  },
  // Using @nuxt/components module to auto-import components
  components: true,
};
