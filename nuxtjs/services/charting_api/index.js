import { getHistoricalDataByResolution } from '../../utils/charts';
import { CHART } from '../../utils/constants';
import historyProvider from './historyProvider';
import stream from './stream';

const supportedResolutions = CHART.SUPPORTED_RESOLUTION;

const config = {
    supported_resolutions: CHART.SUPPORTED_RESOLUTION
}; 

let pairs = [];

export default {
	onReady: async cb => {

		console.log('onReady')
		// chart load config
		setTimeout(() => cb(config), 0);
		
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		console.log('resolveSymbol.symbolName', symbolName);
		var split_data = symbolName.split(/[:/_/]/);

		let decimals = 8;
		var symbol_stub = {
			name: symbolName,
			description: `${split_data[2]}/${split_data[1]}`,
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: split_data[0],
			minmov: 1,
			pricescale: Math.pow(10, decimals),
			has_intraday: true,
			intraday_multipliers: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '1M'],
			has_daily: true,
			has_weekly_and_monthly: true,
			supported_resolution:  supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming',
			has_no_volume: false,
		}

		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
		}, 0)
		
		
	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		// console.log('getBars', {
		// 	symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest
		// })
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			console.log('bars', bars.length);
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		// console.log('subscribeBars', {
		// 	symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback
		// })
		stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
	},
	unsubscribeBars: subscriberUID => {
		// console.log('unsubscribeBars', {
		// 	subscriberUID
		// })
		stream.unsubscribeBars(subscriberUID)
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		// return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
		// console.log('calculateHistoryDepth.resolution|resolutionBack|intervalBack', resolution, resolutionBack, intervalBack);
		console.log('calculateHistoryDepth', {
			resolution, resolutionBack, intervalBack
		})
		return getHistoricalDataByResolution(resolution, resolutionBack, intervalBack);
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('getMarks', {
			symbolInfo, startDate, endDate, onDataCallback, resolution
		})
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('getTimeScaleMarks', {
			symbolInfo, startDate, endDate, onDataCallback, resolution
		})
	},
	getServerTime: cb => {
	},

	updateSocket(_data){
		stream.updateData(_data);
	}
}
