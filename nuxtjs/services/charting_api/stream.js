import { revertResolution } from '../../utils/charts';
import historyProvider from './historyProvider';
// keep track of subscriptions
var _subs = []

export default {

  subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
    const channelString = createChannelString(symbolInfo)

    var newSub = {
      channelString,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name].lastBar,
      listener: updateCb,
    }
    _subs.push(newSub)
  },

  unsubscribeBars: function (uid) {
    var subIndex = _subs.findIndex(e => e.uid === uid)
    if (subIndex === -1) {
      return
    }
    var sub = _subs[subIndex]
    _subs.splice(subIndex, 1)
  },

  updateData: function(msgTick) {
    console.log('stream.updateData', msgTick);
    if(!msgTick) return;
  
    const _sym = msgTick.symbol.split('_');
    const data = {
      sub_type: 0,
      exchange: 'Coinbase',
      to_sym: _sym[0],
      from_sym: _sym[1],
      trade_id: msgTick.last_trade_id,
      ts: (msgTick.close_timestamp),
      // ts: new Date().getTime(),
      volume: parseFloat(msgTick.volume),
      price: parseFloat(msgTick.close),
      open: parseFloat(msgTick.open),
      close: parseFloat(msgTick.close),
      high: parseFloat(msgTick.high),
      low: parseFloat(msgTick.low),
    }
  
    const channelString = `${data.sub_type}~${data.exchange}~${data.to_sym}~${data.from_sym}`
  
    const sub = _subs.find(e => e.channelString === channelString)
  
    if (sub) {
      // disregard the initial catchup snapshot of trades for already closed candles
      if (data.ts < sub.lastBar.time / 1000) {
        return
      }
  
      var _lastBar = updateBar(data, sub)
  
      // send the most recent bar back to TV's realtimeUpdate callback
      sub.listener(_lastBar);
      // update our own record of lastBar
      sub.lastBar = _lastBar
    }
  }
}



// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {
  var lastBar = sub.lastBar;
  let resolution = revertResolution(sub.resolution); // in minutes

  var coeff = resolution * 60
  var rounded = Math.floor(data.ts / coeff) * coeff
  var lastBarSec = lastBar.time / 1000
  var _lastBar

  if (rounded > lastBarSec) {
    // create a new candle
    _lastBar = {
      time: data.ts,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume
    }

  } else {
    // update lastBar candle!
    if (data.close < lastBar.low) {
      lastBar.low = data.close
    } else if (data.close > lastBar.high) {
      lastBar.high = data.close
    }

    lastBar.volume += data.volume
    lastBar.close = data.close

    _lastBar = lastBar
  }
  return _lastBar
}

// takes symbolInfo object as input and creates the subscription string to send to CryptoCompare
function createChannelString(symbolInfo) {
  var channel = symbolInfo.name.split(/[:/_/]/)
  const exchange = channel[0] === 'GDAX' ? 'Coinbase' : channel[0]
  const to = channel[2]
  const from = channel[1]
  // subscribe to the CryptoCompare trade channel for the pair and exchange
  return `0~${exchange}~${from}~${to}`
}