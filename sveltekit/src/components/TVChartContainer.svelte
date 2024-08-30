<!-- svelte-ignore a11y-missing-attribute -->
<script>
  import { widget } from "$lib/charting_library";
  import { UDFCompatibleDatafeed } from "$lib/datafeeds/udf/src/udf-compatible-datafeed";
  import { onMount } from "svelte";

  function getLanguageFromURL() {
    const regex = new RegExp("[\\?&]lang=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  onMount(() => {
    const widgetOptions = {
      symbol: "AAPL",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new UDFCompatibleDatafeed(
        "https://demo_feed.tradingview.com",
        undefined,
        {
          maxResponseLength: 1000,
          expectedOrder: "latestFirst",
        }
      ),
      interval: "1D",
      container: "tv-chart-container",
      library_path: "/charting_library/",

      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
    };

    const tvWidget = new widget(widgetOptions);
  });
</script>

<div id="tv-chart-container" />

<style>
  #tv-chart-container {
    height: calc(100vh - 41px);
  }
</style>
