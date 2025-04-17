# TradingView Charting Library iOS (Swift version) Integration Example

Latest tested version of the library with this example is `v29.2.0` with Xcode `16.3` and iOS `18.2`.

## How to start

1. Check that you can view https://github.com/tradingview/charting_library/. If you do not have access then you can [request access to this repository here](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).
1. Open Example.xcodeproj in Xcode.
1. Click on `Example` folder at the very top of the `Project Navigator`.
1. In the inner menu on the left, select `Example` under `TARGETS`.
1. Select the `Build Phases` tab at the top of the window.
1. Under `Copy Bundle Resources` select the `+` icon.
1. Click on `"Add Other..."` button. 
1. Browse and identify all the files downloaded from `https://github.com/tradingview/charting_library/`. **Note**: Unlike some of the other examples you should copy all files from the repository not just the `datafeeds` and `charting_library` directories. 
1. Select `"Create folder references"`. **Note**: This is important because the library contains files with the same name, but in different folders, so the "Create folder references" option adds files to your application bundle with the same folder structure as in the library.
1. Select all files added to project and move them to the `ChartingLibrary` folder.
1. Lastly, build the application. 

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

