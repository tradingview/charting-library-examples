<template>
  <div :id="containerId" class="TVChartContainer" />
</template>

<script>

function getLanguageFromURL () {
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(window.location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export default {
  name: 'TVChartContainer',
  props: {
    symbol: {
      default: 'AAPL',
      type: String
    },
    interval: {
      default: 'D',
      type: String
    },
    containerId: {
      default: 'tv_chart_container',
      type: String
    },
    datafeedUrl: {
      default: 'https://demo_feed.tradingview.com',
      type: String
    },
    libraryPath: {
      default: '/charting_library/',
      type: String
    },
    chartsStorageUrl: {
      default: 'https://saveload.tradingview.com',
      type: String
    },
    chartsStorageApiVersion: {
      default: '1.1',
      type: String
    },
    clientId: {
      default: 'tradingview.com',
      type: String
    },
    userId: {
      default: 'public_user_id',
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
      type: Object,
      default: () => ({})
    }
  },
  tvWidget: null,
  mounted () {
    const widgetOptions = {
      symbol: this.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
      interval: this.interval,
      container: this.containerId,
      library_path: this.libraryPath,

      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.chartsStorageUrl,
      charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides
    }

    const {
      $TVChart: { Widget }
    } = this
    const tvWidget = new Widget(widgetOptions)
    this.tvWidget = tvWidget
  },
  destroyed () {
    if (this.tvWidget !== null) {
      this.tvWidget.remove()
      this.tvWidget = null
    }
  }
}
</script>

<style scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
