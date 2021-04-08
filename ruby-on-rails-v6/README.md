# README

## Setup TradingView

- Copy `charting_library/charting_library.js` into `app/javascript/packs/charting_library/charting_library.js`
- Copy `datafeeds/udf/dist/*.js` into `app/javascript/packs/datafeeds/`
- Copy `charting_library/*.html` into `public/charting_library/`
- Copy `charting_library/bundles` into `public/charting_library/bundles`

## Run the app

No database migration is needed

```
./bin/rails s
./bin/webpack-dev-server
```
