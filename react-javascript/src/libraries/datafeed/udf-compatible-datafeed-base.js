import { getErrorMessage, logMessage, } from './helpers';
import { HistoryProvider, } from './history-provider';
import { DataPulseProvider } from './data-pulse-provider';
import { QuotesPulseProvider } from './quotes-pulse-provider';
import { SymbolsStorage } from './symbols-storage';

const extractField = (data, field, arrayIndex) => {
	var value = data[field];
	return Array.isArray(value) ? value[arrayIndex] : value;
};

/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */

export class UDFCompatibleDatafeedBase {

	constructor(datafeedURL, quotesProvider, requester, updateFrequency = 10 * 1000) {
		this._configuration = null;
		this._symbolsStorage = null;
		this._datafeedURL = datafeedURL;
		this._requester = requester;
		this._historyProvider = new HistoryProvider(datafeedURL, this._requester);
		this._quotesProvider = quotesProvider;
		this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
		this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);
		this._configurationReadyPromise = this._requestConfiguration()
			.then((configuration) =>  {
				if (configuration === null) {
					configuration = defaultConfiguration();
				}
				this._setupWithConfiguration(configuration);
			});
	}

	onReady = (callback) => {
		this._configurationReadyPromise.then(() => {
			callback(this._configuration);
		});
	};

	// Trading Terminal specific
	getQuotes = (symbols, onDataCallback, onErrorCallback) => {
		this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
	};

	//Trading Terminal specific
	subscribeQuotes = (symbols, fastSymbols, onRealtimeCallback, listenerGuid) => {
		this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
	};
	
	// Trading Terminal specific
	unsubscribeQuotes = (listenerGuid) => {
		this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
	};

	calculateHistoryDepth = (resolution, resolutionBack, intervalBack) => {
		return undefined;
	};

	// The Library calls this function to get marks for visible bars range.
	getMarks = (symbolInfo, from, to, onDataCallback, resolution) => {
		if (!this._configuration.supports_marks) {
			return;
		}
		var requestParams = {
			symbol: symbolInfo.ticker || '',
			from: from,
			to: to,
			resolution: resolution,
		};
		this._send('marks', requestParams)
			.then(function (response) {
				if (!Array.isArray(response)) {
					var result = [];
					for (var i = 0; i < response.id.length; ++i) {
						result.push({
							id: extractField(response, 'id', i),
							time: extractField(response, 'time', i),
							color: extractField(response, 'color', i),
							text: extractField(response, 'text', i),
							label: extractField(response, 'label', i),
							labelFontColor: extractField(response, 'labelFontColor', i),
							minSize: extractField(response, 'minSize', i),
						});
					}
					response = result;
				}
				onDataCallback(response);
			})
			.catch(function (error) {
				logMessage("UdfCompatibleDatafeed: Request marks failed: " + getErrorMessage(error));
				onDataCallback([]);
			});
	};

	// The Library calls this function to get timescale marks for visible bars range.
	getTimescaleMarks = (symbolInfo, from, to, onDataCallback, resolution) => {
		if (!this._configuration.supports_timescale_marks) {
			return;
		}
		let requestParams = {
			symbol: symbolInfo.ticker || '',
			from: from,
			to: to,
			resolution: resolution,
		};
		this._send('timescale_marks', requestParams)
			.then( (response) => {
				if (!Array.isArray(response)) {
					let result = [];
					for (let i = 0; i < response.id.length; ++i) {
						result.push({
							id: extractField(response, 'id', i),
							time: extractField(response, 'time', i),
							color: extractField(response, 'color', i),
							label: extractField(response, 'label', i),
							tooltip: extractField(response, 'tooltip', i),
						});
					}
					response = result;
				}
				onDataCallback(response);
			})
			.catch(function (error) {
				logMessage("UdfCompatibleDatafeed: Request timescale marks failed: " + getErrorMessage(error));
				onDataCallback([]);
			});
	};

	// This function is called if the configuration flag supports_time is set to true when the Charting Library needs to know the server time.
	// It is used to display Countdown on the price scale.
	getServerTime = (callback) => {
		if (!this._configuration.supports_time) {
			return;
		}
		this._send('time')
			.then(function (response) {
				var time = parseInt(response);
				if (!isNaN(time)) {
					callback(time);
				}
			})
			.catch(function (error) {
				logMessage("UdfCompatibleDatafeed: Fail to load server time, error=" + getErrorMessage(error));
			});
	};

	// This call is intended to provide the list of symbols that match the user's search query. 
	searchSymbols = (userInput, exchange, symbolType, onResult) => {
		if (this._configuration.supports_search) {
			var params = {
				limit: 30 /* SearchItemsLimit */,
				query: userInput.toUpperCase(),
				type: symbolType,
				exchange: exchange,
			};
			this._send('search', params)
				.then(function (response) {
					if (response.s !== undefined) {
						logMessage("UdfCompatibleDatafeed: search symbols error=" + response.errmsg);
						onResult([]);
						return;
					}
					onResult(response);
				})
				.catch(function (reason) {
					logMessage("UdfCompatibleDatafeed: Search symbols for '" + userInput + "' failed. Error=" + getErrorMessage(reason));
					onResult([]);
				});
		}
		else {
			if (this._symbolsStorage === null) {
				throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
			}
			this._symbolsStorage.searchSymbols(userInput, exchange, symbolType, 30 /* SearchItemsLimit */)
				.then(onResult)
				.catch(onResult.bind(null, []));
		}
	};

	// Charting Library will call this function when it needs to get SymbolInfo by symbol name.
	resolveSymbol = (symbolName, onResolve, onError) => {
		logMessage('Resolve requested');
		let resolveRequestStartTime = Date.now();

		let onResultReady = (symbolInfo) => {
			logMessage("Symbol resolved: " + (Date.now() - resolveRequestStartTime) + "ms");
			onResolve(symbolInfo);
		};

		if (!this._configuration.supports_group_request) {
			let params = {
				symbol: symbolName,
			};
			this._send('symbols', params)
				.then(function (response) {
					if (response.s !== undefined) {
						onError('unknown_symbol');
					}
					else {
						onResultReady(response);
					}
				})
				.catch(function (reason) {
					logMessage("UdfCompatibleDatafeed: Error resolving symbol: " + getErrorMessage(reason));
					onError('unknown_symbol');
				});
		}
		else {
			if (this._symbolsStorage === null) {
				throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
			}
			this._symbolsStorage.resolveSymbol(symbolName).then(onResultReady).catch(onError);
		}
	};

	// This function is called when the chart needs a history fragment defined by dates range.
	getBars = (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) => {
		this._historyProvider.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
			.then( (result) => {
				onResult(result.bars, result.meta);
			})
			.catch(onError);
	};

	// REALTIME : Charting Library calls this function when it wants to receive real-time updates for a symbol.
	subscribeBars = (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) => {
		this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
	};

	// REALTIME : Charting Library calls this function when it doesn't want to receive updates for this subscriber any more.
	unsubscribeBars = (listenerGuid) => {
		this._dataPulseProvider.unsubscribeBars(listenerGuid);
	};

	_requestConfiguration = () => {
		return this._send('config')
			.catch((reason) => {
				logMessage("UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=" + getErrorMessage(reason));
				return null;
			});
	};

	_send = (urlPath, params) => {
		return this._requester.sendRequest(this._datafeedURL, urlPath, params);
	};

	_setupWithConfiguration = (configurationData) => {
		this._configuration = configurationData;
		if (configurationData.exchanges === undefined) {
			configurationData.exchanges = [];
		}
		if (!configurationData.supports_search && !configurationData.supports_group_request) {
			throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
		}
		if (configurationData.supports_group_request || !configurationData.supports_search) {
			this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
		}
		logMessage("UdfCompatibleDatafeed: Initialized with " + JSON.stringify(configurationData));
	};
} 

const defaultConfiguration = () => {
	return {
		supports_search: false,
		supports_group_request: true,
		supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
		supports_marks: false,
		supports_timescale_marks: false,
	};
};
