<template>
  <div class="crypto-page">
    <Header />
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="AAPL"
              :data="apple"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="MSFT"
              :data="microsoft"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="AMZN"
              :data="amazon"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="GOOGL"
              :data="google"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Vue from "vue";
import { io } from "socket.io-client";

// import SetupIndicator from '~/components/SetupIndicator';
// Importing manually will also throw `windows is not defined error`
// Using `components: true` in nuxt.config.js
// import TradingVue from 'trading-vue-js'
export default {
  name: "app",
  // Importing manually will also throw `windows is not defined error`
  // Using `components: true` in nuxt.config.js
  // components: { TradingVue }
  computed: {
    ext() {
      // TODO: For some reason the injections are initially
      // 'undefined'
      return Object.values(this.$ChartExtensions || {});
    },
  },
  data() {
    return {
      // TODO: For some reason the injections are initially
      // 'undefined'
      apple: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      microsoft: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      amazon: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      google: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      overlays: [this.$SetupIndicator],
    };
  },
  methods: {
    addToChart(data) {
      console.log(data);
      switch (data.symbol) {
        case "AAPL":
          data.t.forEach((element, index) => {
            this.apple.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);

            if (this.apple.data.chart.data > 50) {
              this.apple.data.chart.data.shift();
            }
          });
          break;

        case "MSFT":
          data.t.forEach((element, index) => {
            this.microsoft.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);

            if (this.microsoft.data.chart.data > 50) {
              this.microsoft.data.chart.data.shift();
            }
          });
          break;
        case "AMZN":
          data.t.forEach((element, index) => {
            this.amazon.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);
          });

          if (this.amazon.data.chart.data > 50) {
            this.amazon.data.chart.data.shift();
          }
          break;
        case "GOOGL":
          data.t.forEach((element, index) => {
            this.google.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);
          });

          if (this.google.data.chart.data > 50) {
            this.google.data.chart.data.shift();
          }
          break;
      }
    },
  },
  mounted: function() {
    const websocketURL =
      process.env.backEndURL +
      (proccess.env.backEndPort ? ":" + process.env.backEndPort : "");
    const ioClient = io(websocketURL, {
      transports: ["websocket", "polling"],
    });
    ioClient.once("connect", function() {
      ioClient.emit("stocks");
    });
    ioClient.off("update");
    ioClient.on(
      "update",
      function(data) {
        console.log("entrou de novo");
        this.addToChart(data);
      }.bind(this)
    );
  },
};
</script>
