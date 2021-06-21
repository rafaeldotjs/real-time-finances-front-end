<template>
  <div class="crypto-page">
    <Header />
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="BTC/USDT"
              :data="BTC_USDT"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="w-100 d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="ETH/USDT"
              :data="ETH_USDT"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="w-100 d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="BNB/USDT"
              :data="BNB_USDT"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="w-100 d-flex justify-content-center"
            >
            </trading-vue>
          </client-only>
        </div>
        <div class="col-lg-6 d-flex justify-content-center mb-5">
          <client-only>
            <trading-vue
              title-txt="BCH/USDT"
              :data="BCH_USDT"
              :overlays="overlays"
              :extensions="ext"
              :legend-buttons="['display']"
              class="w-100 d-flex justify-content-center"
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
      BTC_USDT: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      ETH_USDT: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      BNB_USDT: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: "Candles",
              data: [],
            },
          })
        : {},
      BCH_USDT: this.$DataCube
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
      switch (data.symbol) {
        case "BINANCE:BTCUSDT":
          data.t.forEach((element, index) => {
            this.BTC_USDT.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);

            if (this.BTC_USDT.data.chart.data > 50) {
              this.BTC_USDT.data.chart.data.shift();
            }
          });
          break;

        case "BINANCE:ETHUSDT":
          data.t.forEach((element, index) => {
            this.ETH_USDT.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);

            if (this.ETH_USDT.data.chart.data > 50) {
              this.ETH_USDT.data.chart.data.shift();
            }
          });
          break;
        case "BINANCE:BNBUSDT":
          data.t.forEach((element, index) => {
            this.BNB_USDT.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);
          });

          if (this.BNB_USDT.data.chart.data > 50) {
            this.BNB_USDT.data.chart.data.shift();
          }
          break;
        case "BINANCE:BCHUSDT":
          data.t.forEach((element, index) => {
            this.BCH_USDT.data.chart.data.push([
              data.t[index],
              data.o[index],
              data.h[index],
              data.l[index],
              data.c[index],
              data.v[index],
            ]);
          });

          if (this.BCH_USDT.data.chart.data > 50) {
            this.BCH_USDT.data.chart.data.shift();
          }
          break;
      }
    },
  },
  mounted: function() {
    const websocketURL = process.env.backEndURL + ":" + process.env.backEndPort;
    const ioClient = io(websocketURL, {
      transports: ["websocket", "polling"],
    });
    ioClient.once("connect", function() {
      ioClient.emit("crypto");
    });

    ioClient.off("update");
    ioClient.on(
      "update",
      function(data) {
        this.addToChart(data);
      }.bind(this)
    );
  },
};
</script>
