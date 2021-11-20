# TradingView Charting Library and Nuxt.js Integration Example (JavaScript)

## How to start
1. Install dependencies `npm install`.
2. Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/static` folder.
3. Copy `datafeeds` folder from https://github.com/tradingview/charting_library/ to `/static`.
4. Add the code below to the `nuxtconfig.js` in `'head'` <br>
`script:[
      {src:"/datafeeds/udf/dist/polyfills.js", ssr:false , defer:true , async:true},
      {src:"/datafeeds/udf/dist/bundle.js",ssr:false , defer:true, async:true},
       ]`
5. Run `npm run dev`. It will build the project and open a default browser with the Charting Library.

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## What is Nuxt.js
Nuxt.js is a framework for creating Vue.js applications. Its goal is to help Vue developers take advantage of top-notch technologies, fast, easy and in an organized way.
