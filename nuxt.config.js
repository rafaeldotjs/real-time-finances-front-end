export default {
  target: "static",
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
  },
  // Using @nuxt/components module to auto-import components
  components: true,
};
