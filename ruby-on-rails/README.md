# TradingView Charting Library and Ruby on Rails Integration Example.

The earliest supported version of the charting library for these examples is `v20`.

## How to start

1. Check that you can view https://github.com/tradingview/charting_library/. If you do not have access then you can [request access to this repository here](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

1. Install Ruby. This example was created using Ruby 3.0.3.

1. Install Ruby on Rails. This example was created using Rails 7.0.1.

1. Install Rails dependencies with `bundle install`.

1. Copy the charting library files
	1. If you are able to run bash scripts then the `copy_charting_library_files.sh` script can be used to copy the current stable version's files. 
	1. If you are not able to run bash scripts then do the following:
		1. Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/public`. 
		1. Copy `datafeeds` folder from https://github.com/tradingview/charting_library/ to `/public`.

1. Run `rails s` and open `http://localhost:3000`.

Note that the charting library files are intentionally not included in the Rails asset pipeline. [Fingerprinting](https://guides.rubyonrails.org/asset_pipeline.html#what-is-fingerprinting-and-why-should-i-care-questionmark) the charting_library files will break the library so we put the files directly into `public`. In development mode Rails will serve these public files for you. In production you would need to ensure that the files in `public` are served by your production webserver.

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## What is Ruby on Rails

A web-application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller (MVC) pattern. Ruby on Rails is open source software and there are many of the applications that were built with Ruby on Rails such as Basecamp, GitHub, Shopify, Airbnb, Twitch, SoundCloud, Hulu, Zendesk, Square, Highrise, Cookpad. [Learn more](http://rubyonrails.org/).