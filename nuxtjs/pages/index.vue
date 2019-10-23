<template>
    <div class="TVChartContainer" :id="containerId" />
</template>

<script>
import Datafeed from "../services/charting_api/index";

export default {
  name: "TradingViewContainer",
  head() {
    return {
      title: 'Tradingview in Nuxtjs Version',
      script: [
        {
          src: "/vendor/charting_library/charting_library.min.js",
          type: "text/javascript"
        }
      ]
    };
  },

  data() {
    return {
      myWidget: null
    };
  },

  props: {
    containerId: {
      default: "tv_chart_container",
      type: String
    },
    interval: {
      default: "1m",
      type: String
    },
    libraryPath: {
      default: "/vendor/charting_library/",
      type: String
    },
    chartsStorageUrl: {
      default: "https://saveload.tradingview.com",
      type: String
    },
    chartsStorageApiVersion: {
      default: "1.1",
      type: String
    },
    clientId: {
      default: "tradingview.com",
      type: String
    },
    userId: {
      default: "public_user_id",
      type: String
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    autosize: {
      default: true,
      type: Boolean
    },
    studiesOverrides: {
      type: Object
    },
    timezone: {
      default: "Etc/UTC",
      type: String
    },
  },

  methods: {

    initChartSetting() {
      console.log("initChartSetting", this.currentTheme);
      const widgetOptions = {
        symbol: `Coinbase:USDT_BTC`,
        datafeed: Datafeed,
        interval: this.interval,
        container_id: this.containerId,
        library_path: this.libraryPath,

        locale: "en",
        charts_storage_url: this.chartsStorageUrl,
        charts_storage_api_version: this.chartsStorageApiVersion,
        client_id: this.clientId,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,
      };

      this.myWidget = new window.TradingView.widget(widgetOptions);

       this.myWidget.onChartReady(
        () => {
          this.myWidget
            .chart()
            .onDataLoaded()
            .subscribe(
              null,
              asd => {
                console.log("onDataLoaded");
                // listen socket here
                // Datafeed.updateSocket();
              },
              error => {
                console.log("onDataLoaded.error", error);
              }
            );
        },
        error => {
          console.log("onChartReady.error", error);
        }
      );
    }
  },

  mounted() {
    // init chart setting
    setTimeout(() => {
      this.initChartSetting();
    }, 0);

  },

};
</script>

<style lang="css" scoped>
.TVChartContainer {
  height: 100vh;
}
</style>
