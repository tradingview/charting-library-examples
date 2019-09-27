export declare type ResolutionString = string;
export interface Exchange {
	value: string;
	name: string;
	desc: string;
}
export interface DatafeedSymbolType {
	name: string;
	value: string;
}
export interface DatafeedConfiguration {
	exchanges?: Exchange[];
	supported_resolutions?: ResolutionString[];
	supports_marks?: boolean;
	supports_time?: boolean;
	supports_timescale_marks?: boolean;
	symbols_types?: DatafeedSymbolType[];
}
export declare type OnReadyCallback = (configuration: DatafeedConfiguration) => void;
export interface IExternalDatafeed {
	onReady(callback: OnReadyCallback): void;
}
export interface DatafeedQuoteValues {
	ch?: number;
	chp?: number;
	short_name?: string;
	exchange?: string;
	description?: string;
	lp?: number;
	ask?: number;
	bid?: number;
	spread?: number;
	open_price?: number;
	high_price?: number;
	low_price?: number;
	prev_close_price?: number;
	volume?: number;
	original_name?: string;
	[valueName: string]: string | number | undefined;
}
export interface QuoteOkData {
	s: 'ok';
	n: string;
	v: DatafeedQuoteValues;
}
export interface QuoteErrorData {
	s: 'error';
	n: string;
	v: object;
}
export declare type QuoteData = QuoteOkData | QuoteErrorData;
export declare type QuotesCallback = (data: QuoteData[]) => void;
export interface IDatafeedQuotesApi {
	getQuotes(symbols: string[], onDataCallback: QuotesCallback, onErrorCallback: (msg: string) => void): void;
	subscribeQuotes(symbols: string[], fastSymbols: string[], onRealtimeCallback: QuotesCallback, listenerGUID: string): void;
	unsubscribeQuotes(listenerGUID: string): void;
}
export declare type CustomTimezones = 'America/New_York' | 'America/Los_Angeles' | 'America/Chicago' | 'America/Phoenix' | 'America/Toronto' | 'America/Vancouver' | 'America/Argentina/Buenos_Aires' | 'America/El_Salvador' | 'America/Sao_Paulo' | 'America/Bogota' | 'America/Caracas' | 'Europe/Moscow' | 'Europe/Athens' | 'Europe/Belgrade' | 'Europe/Berlin' | 'Europe/London' | 'Europe/Luxembourg' | 'Europe/Madrid' | 'Europe/Paris' | 'Europe/Rome' | 'Europe/Warsaw' | 'Europe/Istanbul' | 'Europe/Zurich' | 'Australia/Sydney' | 'Australia/Brisbane' | 'Australia/Adelaide' | 'Australia/ACT' | 'Asia/Almaty' | 'Asia/Ashkhabad' | 'Asia/Tokyo' | 'Asia/Taipei' | 'Asia/Singapore' | 'Asia/Shanghai' | 'Asia/Seoul' | 'Asia/Tehran' | 'Asia/Dubai' | 'Asia/Kolkata' | 'Asia/Hong_Kong' | 'Asia/Bangkok' | 'Asia/Chongqing' | 'Asia/Jerusalem' | 'Asia/Kuwait' | 'Asia/Muscat' | 'Asia/Qatar' | 'Asia/Riyadh' | 'Pacific/Auckland' | 'Pacific/Chatham' | 'Pacific/Fakaofo' | 'Pacific/Honolulu' | 'America/Mexico_City' | 'Africa/Cairo' | 'Africa/Johannesburg' | 'Asia/Kathmandu' | 'US/Mountain';
export declare type Timezone = 'Etc/UTC' | CustomTimezones;
export interface LibrarySymbolInfo {
	/**
	 * Symbol Name
	 */
	name: string;
	full_name: string;
	base_name?: [string];
	/**
	 * Unique symbol id
	 */
	ticker?: string;
	description: string;
	type: string;
	/**
	 * @example "1700-0200"
	 */
	session: string;
	/**
	 * Traded exchange
	 * @example "NYSE"
	 */
	exchange: string;
	listed_exchange: string;
	timezone: Timezone;
	/**
	 * Code (Tick)
	 * @example 8/16/.../256 (1/8/100 1/16/100 ... 1/256/100) or 1/10/.../10000000 (1 0.1 ... 0.0000001)
	 */
	pricescale: number;
	/**
	 * The number of units that make up one tick.
	 * @example For example, U.S. equities are quotes in decimals, and tick in decimals, and can go up +/- .01. So the tick increment is 1. But the e-mini S&P futures contract, though quoted in decimals, goes up in .25 increments, so the tick increment is 25. (see also Tick Size)
	 */
	minmov: number;
	fractional?: boolean;
	/**
	 * @example Quarters of 1/32: pricescale=128, minmovement=1, minmovement2=4
	 */
	minmove2?: number;
	/**
	 * false if DWM only
	 */
	has_intraday?: boolean;
	/**
	 * An array of resolutions which should be enabled in resolutions picker for this symbol.
	 */
	supported_resolutions: ResolutionString[];
	/**
	 * @example (for ex.: "1,5,60") - only these resolutions will be requested, all others will be built using them if possible
	 */
	intraday_multipliers?: string[];
	has_seconds?: boolean;
	/**
	 * It is an array containing seconds resolutions (in seconds without a postfix) the datafeed builds by itself.
	 */
	seconds_multipliers?: string[];
	has_daily?: boolean;
	has_weekly_and_monthly?: boolean;
	has_empty_bars?: boolean;
	force_session_rebuild?: boolean;
	has_no_volume?: boolean;
	/**
	 * Integer showing typical volume value decimal places for this symbol
	 */
	volume_precision?: number;
	data_status?: 'streaming' | 'endofday' | 'pulsed' | 'delayed_streaming';
	/**
	 * Boolean showing whether this symbol is expired futures contract or not.
	 */
	expired?: boolean;
	/**
	 * Unix timestamp of expiration date.
	 */
	expiration_date?: number;
	sector?: string;
	industry?: string;
	currency_code?: string;
}
export interface DOMLevel {
	price: number;
	volume: number;
}
export interface DOMData {
	snapshot: boolean;
	asks: DOMLevel[];
	bids: DOMLevel[];
}
export interface Bar {
	time: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
}
export interface SearchSymbolResultItem {
	symbol: string;
	full_name: string;
	description: string;
	exchange: string;
	ticker: string;
	type: string;
}
export interface HistoryMetadata {
	noData: boolean;
	nextTime?: number | null;
}
export interface MarkCustomColor {
	color: string;
	background: string;
}
export declare type MarkConstColors = 'red' | 'green' | 'blue' | 'yellow';
export interface Mark {
	id: string | number;
	time: number;
	color: MarkConstColors | MarkCustomColor;
	text: string;
	label: string;
	labelFontColor: string;
	minSize: number;
}
export interface TimescaleMark {
	id: string | number;
	time: number;
	color: MarkConstColors | string;
	label: string;
	tooltip: string[];
}
export declare type ResolutionBackValues = 'D' | 'M';
export interface HistoryDepth {
	resolutionBack: ResolutionBackValues;
	intervalBack: number;
}
export declare type SearchSymbolsCallback = (items: SearchSymbolResultItem[]) => void;
export declare type ResolveCallback = (symbolInfo: LibrarySymbolInfo) => void;
export declare type HistoryCallback = (bars: Bar[], meta: HistoryMetadata) => void;
export declare type SubscribeBarsCallback = (bar: Bar) => void;
export declare type GetMarksCallback<T> = (marks: T[]) => void;
export declare type ServerTimeCallback = (serverTime: number) => void;
export declare type DomeCallback = (data: DOMData) => void;
export declare type ErrorCallback = (reason: string) => void;
export interface IDatafeedChartApi {
	calculateHistoryDepth?(resolution: ResolutionString, resolutionBack: ResolutionBackValues, intervalBack: number): HistoryDepth | undefined;
	getMarks?(symbolInfo: LibrarySymbolInfo, from: number, to: number, onDataCallback: GetMarksCallback<Mark>, resolution: ResolutionString): void;
	getTimescaleMarks?(symbolInfo: LibrarySymbolInfo, from: number, to: number, onDataCallback: GetMarksCallback<TimescaleMark>, resolution: ResolutionString): void;
	/**
	 * This function is called if configuration flag supports_time is set to true when chart needs to know the server time.
	 * The charting library expects callback to be called once.
	 * The time is provided without milliseconds. Example: 1445324591. It is used to display Countdown on the price scale.
	 */
	getServerTime?(callback: ServerTimeCallback): void;
	searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void;
	resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback): void;
	getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, rangeStartDate: number, rangeEndDate: number, onResult: HistoryCallback, onError: ErrorCallback, isFirstCall: boolean): void;
	subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback: () => void): void;
	unsubscribeBars(listenerGuid: string): void;
	subscribeDepth?(symbolInfo: LibrarySymbolInfo, callback: DomeCallback): string;
	unsubscribeDepth?(subscriberUID: string): void;
}

export as namespace TradingView;
