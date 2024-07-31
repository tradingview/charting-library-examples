# TradingView Charting Library and Sveltekit(Svelte) Integration Example

The earliest supported version of the charting library for these examples is `v28.0.0`.

## How to start

1. Check that you can view
   [https://github.com/tradingview/charting_library/](https://github.com/tradingview/charting_library/).
   If you do not have access then you can
   [request access to this repository here](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).
1. Install dependencies `npm install`.
1. Copy the charting library files
   1. If you are able to run bash scripts then the
      `copy_charting_library_files.sh` script can be used to copy the current
      stable version's files.
   1. If you are not able to run bash scripts then do the following:
      1. Copy the `charting_library` folder from
         [https://github.com/tradingview/charting_library/](https://github.com/tradingview/charting_library/)
         to `/static` and `/src/lib` folder.
      1. Copy the `datafeeds` folder from
         [https://github.com/tradingview/charting_library/](https://github.com/tradingview/charting_library/)
         to `/src/lib`.
1. Run `npm run dev` to run the app in development mode
   with the Charting Library.
1. Run `npm run build` To create a production version of your app.
   > You can preview the production build with `npm run preview`.

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free,
downloadable library is hosted on your servers and is connected to your data
feed to be used in your website or app.
[Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## Credit

Example kindly provided by [Razz19](https://github.com/Razz19)
