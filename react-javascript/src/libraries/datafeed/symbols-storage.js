import { getErrorMessage, logMessage, } from './helpers';

const extractField = (data, field, arrayIndex) => {
	let value = data[field];
	return Array.isArray(value) ? value[arrayIndex] : value;
};

export class SymbolsStorage {
	constructor(datafeedUrl, datafeedSupportedResolutions, requester)
	{
		this._exchangesList = ['NYSE', 'FOREX', 'AMEX'];
		this._symbolsInfo = {};
		this._symbolsList = [];
		this._datafeedUrl = datafeedUrl;
		this._datafeedSupportedResolutions = datafeedSupportedResolutions;
		this._requester = requester;
		this._readyPromise = this._init();
		this._readyPromise.catch(function (error) {
			// seems it is impossible
			console.error("SymbolsStorage: Cannot init, error=" + error.toString());
		});
	}

	// BEWARE: this function does not consider symbol's exchange
	resolveSymbol = (symbolName) => {
		return this._readyPromise.then( () => {
			let symbolInfo = this._symbolsInfo[symbolName];
			if (symbolInfo === undefined) {
				return Promise.reject('invalid symbol');
			}
			return Promise.resolve(symbolInfo);
		});
	};

	searchSymbols = (searchString, exchange, symbolType, maxSearchResults) => {
		return this._readyPromise.then( () => {
			let weightedResult = [];
			let queryIsEmpty = searchString.length === 0;
			searchString = searchString.toUpperCase();
			let _loop_1 = (symbolName) => {
				let symbolInfo = this._symbolsInfo[symbolName];
				if (symbolInfo === undefined) {
					return "continue";
				}
				if (symbolType.length > 0 && symbolInfo.type !== symbolType) {
					return "continue";
				}
				if (exchange && exchange.length > 0 && symbolInfo.exchange !== exchange) {
					return "continue";
				}
				let positionInName = symbolInfo.name.toUpperCase().indexOf(searchString);
				let positionInDescription = symbolInfo.description.toUpperCase().indexOf(searchString);
				if (queryIsEmpty || positionInName >= 0 || positionInDescription >= 0) {
					let alreadyExists = weightedResult.some(function (item) { return item.symbolInfo === symbolInfo; });
					if (!alreadyExists) {
						let weight = positionInName >= 0 ? positionInName : 8000 + positionInDescription;
						weightedResult.push({ symbolInfo: symbolInfo, weight: weight });
					}
				}
			};
			for (let _i = 0, _a = this._symbolsList; _i < _a.length; _i++) {
				let symbolName = _a[_i];
				_loop_1(symbolName);
			}
			let result = weightedResult
				.sort( (item1, item2) => { return item1.weight - item2.weight; })
				.slice(0, maxSearchResults)
				.map( (item) => {
					let symbolInfo = item.symbolInfo;
					return {
						symbol: symbolInfo.name,
						full_name: symbolInfo.full_name,
						description: symbolInfo.description,
						exchange: symbolInfo.exchange,
						params: [],
						type: symbolInfo.type,
						ticker: symbolInfo.name,
					};
				});
			return Promise.resolve(result);
		});
	};

	_init = () => {
		let promises = [];
		let alreadyRequestedExchanges = {};

		for (let _i = 0, _a = this._exchangesList; _i < _a.length; _i++) {
			let exchange = _a[_i];
			if (alreadyRequestedExchanges[exchange]) {
				continue;
			}
			alreadyRequestedExchanges[exchange] = true;
			promises.push(this._requestExchangeData(exchange));
		}

		return Promise.all(promises)
			.then(function () {
				this._symbolsList.sort();
				logMessage('SymbolsStorage: All exchanges data loaded');
			});
	};

	_requestExchangeData = (exchange) => {
		return new Promise(function (resolve, reject) {
			this._requester.sendRequest(this._datafeedUrl, 'symbol_info', { group: exchange })
				.then( (response) => {
					try {
						this._onExchangeDataReceived(exchange, response);
					}
					catch (error) {
						reject(error);
						return;
					}
					resolve();
				})
				.catch(function (reason) {
					logMessage("SymbolsStorage: Request data for exchange '" + exchange + "' failed, reason=" + getErrorMessage(reason));
					resolve();
				});
		});
	};

	_onExchangeDataReceived = (exchange, data) => {
		let symbolIndex = 0;
		try {
			let symbolsCount = data.symbol.length;
			let tickerPresent = data.ticker !== undefined;
			for (; symbolIndex < symbolsCount; ++symbolIndex) {
				let symbolName = data.symbol[symbolIndex];
				let listedExchange = extractField(data, 'exchange-listed', symbolIndex);
				let tradedExchange = extractField(data, 'exchange-traded', symbolIndex);
				let fullName = tradedExchange + ':' + symbolName;
				let ticker = tickerPresent ? extractField(data, 'ticker', symbolIndex) : symbolName;
				let symbolInfo = {
					ticker: ticker,
					name: symbolName,
					base_name: [listedExchange + ':' + symbolName],
					full_name: fullName,
					listed_exchange: listedExchange,
					exchange: tradedExchange,
					description: extractField(data, 'description', symbolIndex),
					has_intraday: definedValueOrDefault(extractField(data, 'has-intraday', symbolIndex), false),
					has_no_volume: definedValueOrDefault(extractField(data, 'has-no-volume', symbolIndex), false),
					minmov: extractField(data, 'minmovement', symbolIndex) || extractField(data, 'minmov', symbolIndex) || 0,
					minmove2: extractField(data, 'minmove2', symbolIndex) || extractField(data, 'minmov2', symbolIndex),
					fractional: extractField(data, 'fractional', symbolIndex),
					pricescale: extractField(data, 'pricescale', symbolIndex),
					type: extractField(data, 'type', symbolIndex),
					session: extractField(data, 'session-regular', symbolIndex),
					timezone: extractField(data, 'timezone', symbolIndex),
					supported_resolutions: definedValueOrDefault(extractField(data, 'supported-resolutions', symbolIndex), this._datafeedSupportedResolutions),
					force_session_rebuild: extractField(data, 'force-session-rebuild', symbolIndex),
					has_daily: definedValueOrDefault(extractField(data, 'has-daily', symbolIndex), true),
					intraday_multipliers: definedValueOrDefault(extractField(data, 'intraday-multipliers', symbolIndex), ['1', '5', '15', '30', '60']),
					has_weekly_and_monthly: extractField(data, 'has-weekly-and-monthly', symbolIndex),
					has_empty_bars: extractField(data, 'has-empty-bars', symbolIndex),
					volume_precision: definedValueOrDefault(extractField(data, 'volume-precision', symbolIndex), 0),
				};
				this._symbolsInfo[ticker] = symbolInfo;
				this._symbolsInfo[symbolName] = symbolInfo;
				this._symbolsInfo[fullName] = symbolInfo;
				this._symbolsList.push(symbolName);
			}
		}
		catch (error) {
			throw new Error("SymbolsStorage: API error when processing exchange " + exchange + " symbol #" + symbolIndex + " (" + data.symbol[symbolIndex] + "): " + error.message);
		}
	};
}

const definedValueOrDefault = (value, defaultValue) => {
	return value !== undefined ? value : defaultValue;
};
