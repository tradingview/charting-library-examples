// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("channels")
require("packs/datafeeds/polyfills")

const Datafeeds = require("packs/datafeeds/bundle")
const TradingView = require("packs/charting_library/charting_library")

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(location.search);

  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function initOnReady() {
  var widget = window.tvWidget = new TradingView.widget({
    symbol: 'AAPL',
    datafeed: new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
    interval: 'D',
    container_id: 'tv_chart_container',
    library_path: '/charting_library/',

    locale: getLanguageFromURL() || 'en',
    disabled_features: ['use_localstorage_for_settings'],
    enabled_features: ['study_templates'],
    charts_storage_url: 'https://saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studies_overrides: {},
  });

  widget.onChartReady(() => {
    widget.headerReady().then(() => {
      const button = widget.createButton();

      button.setAttribute('title', 'Click to show a notification popup');
      button.classList.add('apply-common-tooltip');

      button.addEventListener('click', () => widget.showNoticeDialog({
        title: 'Notification',
        body: 'TradingView Charting Library API works correctly',
        callback: () => {
          console.log('Noticed!');
        },
      }));

      button.innerHTML = 'Check API';
    });
  });
};

window.addEventListener('DOMContentLoaded', initOnReady, false);

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
