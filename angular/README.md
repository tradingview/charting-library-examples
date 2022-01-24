# TradingView Charting Library and Angular 5 Integration Example

The earliest supported version of the charting library for these examples is `v20`.

## How to start

1. Check that you can view https://github.com/tradingview/charting_library/. If you do not have access then you can [request access to this repository here](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).
1. Install dependencies with `npm install`.
1. Copy the charting library files
	1. If you are able to run bash scripts then the `copy_charting_library_files.sh` script can be used to copy the current stable version's files.
	1. If you are not able to run bash scripts then do the following:
		1. Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/src/assets`. 
		1. Copy `datafeeds` folder from https://github.com/tradingview/charting_library/ to `/src/assets`.
1. Run `./node_modules/.bin/ng serve` (use `"./node_modules/.bin/ng" serve` in Windows) for a dev server and navigate to `http://localhost:4200/`.

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## What is Angular

Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop. [Learn more](https://angular.io/docs).

## About This Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.