# TradingView Charting Library and Vue.js Integration Example (TypeScript)

The earliest supported version of the charting library for these examples is `v20`.

## How to start

1. Check that you can view https://github.com/tradingview/charting_library/. If you do not have access then you can [request access to this repository here](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).
1. Install dependencies `npm install`.
1. Copy the charting library files
	1. If you are able to run bash scripts then the `copy_charting_library_files.sh` script can be used to copy the current stable version's files.
	1. If you are not able to run bash scripts then do the following:
		1. Copy the `charting_library` folder from https://github.com/tradingview/charting_library/ to `/public` folder. 
		1. Copy the `datafeeds` folder from https://github.com/tradingview/charting_library/ to `/public`.
1. Run `npm run serve`. It will build the project and open a default browser with the Charting Library.

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## What is Vue.js

Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.

## About This Project

This project was bootstrapped with [Vue CLI](https://cli.vuejs.org/).
