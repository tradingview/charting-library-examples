import { MARKET_CHART } from '../../utils/apis';
import { getResolution } from '../../utils/charts';

var rp = require('request-promise').defaults({
  json: true
})


export default {
  /**
   * request:
   * market/chart?pair=USDT_BTC&interval=1m&limit=1000&start_time=1565805993000&end_time=1565892453000
   */

  /**
   * response:
   * {
        "success": true,
        "message": "string",
        "data": {
                 "ticks": [
                       {   
                           "open": "number",
                           "close": "number",
                           "high": "number",
                           "low": "number",
                           "volume": "number",
                           "timestamp": "number"
                         }
                   ],
                  "symbol": "string",  // BTC_USDT, ...
                  "interval": "string",  // 1m|3m|5m|15m|30m|1H|2H|4H|6H|12H|1D|1W|1M
                  "start_time": long,   // in millisecond
                  "end_time": long.    // in millisecond
           }
      }

   */
  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    var split_symbol = symbolInfo.name.split(/[:/_/]/)
    const url = `${MARKET_CHART}`;
    const pair = `${split_symbol[1]}_${split_symbol[2]}`;
    const qs = {
      pair: pair,
      interval: getResolution(resolution),
      limit: limit ? limit : 1000,
      start_time: from * 1000,
      end_time: to * 1000
    }
    return rp({
        url: `${url}`,
        qs,
      })
      .then(data => {
        console.log('history.data', data)
        if (!data || !data.data || data.success == false) {
          return []
        }
        if (data.data.ticks.length) {
          const bars = data.data.ticks.map(el => {
            return {
              time: el.timestamp, //TradingView requires bar time in ms
              low: parseFloat(el.low),
              high: parseFloat(el.high),
              open: parseFloat(el.open),
              close: parseFloat(el.close),
              volume: parseFloat(el.volume)
            }
          })
          if (first) {
            var lastBar = bars[bars.length - 1]
            history[symbolInfo.name] = {
              lastBar: lastBar
            }
          }
          return bars;
        } else {
          return []
        }
      })
      .catch(err => {
        console.log('history.getBars.err', err);
      })
  },

}
