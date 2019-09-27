/// <reference types="jquery" />

export declare type LanguageCode = 'ar' | 'zh' | 'cs' | 'da_DK' | 'nl_NL' | 'en' | 'et_EE' | 'fr' | 'de' | 'el' | 'he_IL' | 'hu_HU' | 'id_ID' | 'it' | 'ja' | 'ko' | 'fa' | 'pl' | 'pt' | 'ro' | 'ru' | 'sk_SK' | 'es' | 'sv' | 'th' | 'tr' | 'vi';
export interface ISubscription<TFunc extends Function> {
	subscribe(obj: object | null, member: TFunc, singleshot?: boolean): void;
	unsubscribe(obj: object | null, member: TFunc): void;
	unsubscribeAll(obj: object | null): void;
}
export interface IDelegate<TFunc extends Function> extends ISubscription<TFunc> {
	fire: TFunc;
}
export interface IDestroyable {
	destroy(): void;
}
/**
 * This is the generic type useful for declaring a nominal type,
 * which does not structurally matches with the base type and
 * the other types declared over the same base type
 *
 * Usage:
 * @example
 * type Index = Nominal<number, 'Index'>;
 * // let i: Index = 42; // this fails to compile
 * let i: Index = 42 as Index; // OK
 * @example
 * type TagName = Nominal<string, 'TagName'>;
 */
export declare type Nominal<T, Name extends string> = T & {
	[Symbol.species]: Name;
};
export interface FormatterParseResult {
	res: boolean;
}
export interface ErrorFormatterParseResult extends FormatterParseResult {
	error?: string;
	res: false;
}
export interface SuccessFormatterParseResult extends FormatterParseResult {
	res: true;
	suggest?: string;
}
export interface IFormatter {
	format(value: any): string;
	parse?(value: string): ErrorFormatterParseResult | SuccessFormatterParseResult;
}
export declare type StudyInputValueType = string | number | boolean;
export declare type StudyOverrideValueType = string | number | boolean;
export interface StudyOverrides {
	[key: string]: StudyOverrideValueType;
}
export interface WatchedValueSubscribeOptions {
	once?: boolean;
	callWithLast?: boolean;
}
export interface IWatchedValueReadonly<T> {
	value(): T;
	subscribe(callback: (value: T) => void, options?: WatchedValueSubscribeOptions): void;
	unsubscribe(callback?: ((value: T) => void) | null): void;
	spawn(): IWatchedValueReadonlySpawn<T>;
}
export interface IWatchedValueReadonlySpawn<T> extends IWatchedValueReadonly<T>, IDestroyable {
}
export declare type WatchedValueCallback<T> = (value: T) => void;
export interface IWatchedValue<T> extends IWatchedValueReadonly<T> {
	value(): T;
	setValue(value: T, forceUpdate?: boolean): void;
	subscribe(callback: WatchedValueCallback<T>, options?: WatchedValueSubscribeOptions): void;
	unsubscribe(callback?: WatchedValueCallback<T> | null): void;
	readonly(): IWatchedValueReadonly<T>;
	spawn(): IWatchedValueSpawn<T>;
}
export interface IWatchedValueSpawn<T> extends IWatchedValueReadonlySpawn<T>, IWatchedValue<T> {
	spawn(): IWatchedValueSpawn<T>;
}
export declare const enum ConnectionStatus {
	Connected = 1,
	Connecting = 2,
	Disconnected = 3,
	Error = 4,
}
export declare const enum OrderType {
	Limit = 1,
	Market = 2,
	Stop = 3,
	StopLimit = 4,
}
export declare const enum Side {
	Buy = 1,
	Sell = -1,
}
export declare const enum OrderStatus {
	Canceled = 1,
	Filled = 2,
	Inactive = 3,
	Placing = 4,
	Rejected = 5,
	Working = 6,
}
export declare const enum ParentType {
	Order = 1,
	Position = 2,
	Trade = 3,
}
export declare const enum OrderTicketFocusControl {
	StopLoss = 1,
	StopPrice = 2,
	TakeProfit = 3,
}
export declare const enum NotificationType {
	Error = 0,
	Success = 1,
}
export interface TableRow {
	priceFormatter?: IFormatter;
	[name: string]: any;
}
export interface TableFormatterInputs {
	value: number | string | Side | OrderType | OrderStatus;
	prevValue?: number | undefined;
	row: TableRow;
	$container: JQuery;
	priceFormatter?: IFormatter;
}
export declare type TableElementFormatFunction = (inputs: TableFormatterInputs) => string | JQuery;
export interface TableElementFormatter {
	name: string;
	format: TableElementFormatFunction;
}
export declare type StandardFormatterName = 'date' | 'default' | 'fixed' | 'formatPrice' | 'formatPriceForexSup' | 'integerSeparated' | 'localDate' | 'percentage' | 'pips' | 'profit' | 'side' | 'status' | 'symbol' | 'type';
export interface DOMLevel {
	price: number;
	volume: number;
}
export interface DOMData {
	snapshot: boolean;
	asks: DOMLevel[];
	bids: DOMLevel[];
}
export interface QuantityMetainfo {
	min: number;
	max: number;
	step: number;
	default?: number;
}
export interface InstrumentInfo {
	qty: QuantityMetainfo;
	pipValue: number;
	pipSize: number;
	minTick: number;
	description: string;
	domVolumePrecision?: number;
}
export interface CustomFields {
	[key: string]: any;
}
export interface PreOrder {
	symbol: string;
	brokerSymbol?: string;
	type?: OrderType;
	side?: Side;
	qty: number;
	status?: OrderStatus;
	stopPrice?: number;
	limitPrice?: number;
	stopLoss?: number;
	takeProfit?: number;
	duration?: OrderDuration;
}
export interface PlacedOrder extends PreOrder, CustomFields {
	id: string;
	filledQty?: number;
	avgPrice?: number;
	updateTime?: number;
	takeProfit?: number;
	stopLoss?: number;
	type: OrderType;
	side: Side;
	status: OrderStatus;
}
export interface OrderWithParent extends PlacedOrder {
	parentId: string;
	parentType: ParentType;
}
export declare type Order = OrderWithParent | PlacedOrder;
export interface Position {
	id: string;
	symbol: string;
	brokerSymbol?: string;
	qty: number;
	side: Side;
	avgPrice: number;
	[key: string]: any;
}
export interface Trade extends CustomFields {
	id: string;
	date: number;
	symbol: string;
	brokerSymbol?: string;
	qty: number;
	side: Side;
	price: number;
}
export interface Execution extends CustomFields {
	symbol: string;
	brokerSymbol?: string;
	price: number;
	qty: number;
	side: Side;
	time: number;
}
export interface AccountInfo {
	id: string;
	name: string;
	currency?: string;
	currencySign?: string;
}
export interface AccountManagerColumn {
	id?: string;
	label: string;
	className?: string;
	formatter?: StandardFormatterName | 'orderSettings' | 'posSettings' | string;
	property?: string;
	sortProp?: string;
	modificationProperty?: string;
	notSortable?: boolean;
	help?: string;
	highlightDiff?: boolean;
	fixedWidth?: boolean;
	notHideable?: boolean;
	hideByDefault?: boolean;
}
export interface SortingParameters {
	columnId: string;
	asc?: boolean;
}
export interface AccountManagerTable {
	id: string;
	title?: string;
	columns: AccountManagerColumn[];
	initialSorting?: SortingParameters;
	changeDelegate: ISubscription<(data: {}) => void>;
	getData(): Promise<{}[]>;
}
export interface AccountManagerPage {
	id: string;
	title: string;
	tables: AccountManagerTable[];
}
export interface AccountManagerInfo {
	accountTitle: string;
	accountsList?: AccountInfo[];
	account?: IWatchedValue<AccountInfo>;
	summary: AccountManagerSummaryField[];
	customFormatters?: TableElementFormatter[];
	orderColumns: AccountManagerColumn[];
	historyColumns?: AccountManagerColumn[];
	positionColumns: AccountManagerColumn[];
	tradeColumns?: AccountManagerColumn[];
	pages: AccountManagerPage[];
	possibleOrderStatuses?: OrderStatus[];
	contextMenuActions?(contextMenuEvent: JQueryEventObject, activePageActions: ActionMetaInfo[]): Promise<ActionMetaInfo[]>;
}
export interface TradingQuotes {
	trade?: number;
	size?: number;
	bid?: number;
	bid_size?: number;
	ask?: number;
	ask_size?: number;
	spread?: number;
}
export interface ActionDescription {
	text?: '-' | string;
	separator?: boolean;
	shortcut?: string;
	tooltip?: string;
	checked?: boolean;
	checkable?: boolean;
	enabled?: boolean;
	externalLink?: boolean;
}
export interface MenuSeparator extends ActionDescription {
	separator: boolean;
}
export interface ActionDescriptionWithCallback extends ActionDescription {
	action: (a: ActionDescription) => void;
}
export declare type ActionMetaInfo = ActionDescriptionWithCallback | MenuSeparator;
export interface AccountManagerSummaryField {
	text: string;
	wValue: IWatchedValueReadonly<number>;
	formatter?: string;
}
export interface OrderDurationMetaInfo {
	hasDatePicker?: boolean;
	hasTimePicker?: boolean;
	name: string;
	value: string;
}
export interface OrderDuration {
	/**
	 * type is OrderDurationMetaInfo.value
	 */
	type: string;
	datetime?: number;
}
export interface BrokerConfigFlags {
	showQuantityInsteadOfAmount?: boolean;
	supportOrderBrackets?: boolean;
	supportPositionBrackets?: boolean;
	supportTradeBrackets?: boolean;
	supportTrades?: boolean;
	supportClosePosition?: boolean;
	supportCloseTrade?: boolean;
	supportEditAmount?: boolean;
	supportLevel2Data?: boolean;
	supportMultiposition?: boolean;
	supportPLUpdate?: boolean;
	supportReducePosition?: boolean;
	supportReversePosition?: boolean;
	supportStopLimitOrders?: boolean;
	supportDemoLiveSwitcher?: boolean;
	supportCustomPlaceOrderTradableCheck?: boolean;
	supportMarketBrackets?: boolean;
	supportSymbolSearch?: boolean;
	supportModifyDuration?: boolean;
	supportModifyOrder?: boolean;
	calculatePLUsingLast?: boolean;
	requiresFIFOCloseTrades?: boolean;
	supportBottomWidget?: boolean;
	/**
	 * @deprecated
	 */
	supportBrackets?: boolean;
}
export interface SingleBrokerMetaInfo {
	configFlags: BrokerConfigFlags;
	customNotificationFields?: string[];
	durations?: OrderDurationMetaInfo[];
}
export interface Brackets {
	stopLoss?: number;
	takeProfit?: number;
}
export interface DefaultContextMenuActionsParams {
}
export interface DefaultDropdownActionsParams {
	showFloatingToolbar?: boolean;
	showDOM?: boolean;
	tradingProperties?: boolean;
	selectAnotherBroker?: boolean;
	disconnect?: boolean;
	showHowToUse?: boolean;
}
export interface ITradeContext {
	symbol: string;
	displaySymbol: string;
	value: number | null;
	formattedValue: string;
	last: number;
}
export interface QuotesBase {
	change: number;
	change_percent: number;
	last_price: number;
	fractional: number;
	minmov: number;
	minmove2: number;
	pricescale: number;
	description: string;
}
export interface OrderDialogOptions {
	customFields?: (TextWithCheckboxFieldMetaInfo | CustomInputFieldMetaInfo)[];
}
export interface BaseInputFieldValidatorResult {
	valid: boolean;
}
export interface PositiveBaseInputFieldValidatorResult extends BaseInputFieldValidatorResult {
	valid: true;
}
export interface NegativeBaseInputFieldValidatorResult extends BaseInputFieldValidatorResult {
	valid: false;
	errorMessage: string;
}
export declare type InputFieldValidatorResult = PositiveBaseInputFieldValidatorResult | NegativeBaseInputFieldValidatorResult;
export declare type InputFieldValidator = (value: any) => InputFieldValidatorResult;
export interface CustomInputFieldMetaInfo {
	id: string;
	title: string;
	placeHolder: string;
	value: any;
	validator?: InputFieldValidator;
	customInfo?: any;
}
export interface TextWithCheckboxValue {
	text: string;
	checked: boolean;
}
export interface TextWithCheckboxFieldCustomInfo {
	checkboxTitle: string;
	asterix?: boolean;
}
export declare type TextInputFieldValidator = (value: string) => InputFieldValidatorResult;
export interface TextWithCheckboxFieldMetaInfo extends CustomInputFieldMetaInfo {
	value: TextWithCheckboxValue;
	customInfo: TextWithCheckboxFieldCustomInfo;
	validator?: TextInputFieldValidator;
}
export interface CustomInputFieldsValues {
	[fieldId: string]: TextWithCheckboxValue | any;
}
export interface IBrokerCommon {
	chartContextMenuActions(context: ITradeContext, options?: DefaultContextMenuActionsParams): Promise<ActionMetaInfo[]>;
	isTradable(symbol: string): Promise<boolean>;
	connectionStatus(): ConnectionStatus;
	placeOrder(order: PreOrder, silently?: boolean): Promise<void>;
	modifyOrder(order: Order, silently?: boolean, focus?: OrderTicketFocusControl): Promise<void>;
	orders(): Promise<Order[]>;
	positions(): Promise<Position[]>;
	trades?(): Promise<Trade[]>;
	executions(symbol: string): Promise<Execution[]>;
	symbolInfo(symbol: string): Promise<InstrumentInfo>;
	accountInfo(): Promise<AccountInfo>;
	editPositionBrackets?(positionId: string, focus?: OrderTicketFocusControl, brackets?: Brackets, silently?: boolean): Promise<void>;
	editTradeBrackets?(tradeId: string, focus?: OrderTicketFocusControl, brackets?: Brackets, silently?: boolean): Promise<void>;
	accountManagerInfo(): AccountManagerInfo;
	formatter?(symbol: string): Promise<IFormatter>;
	spreadFormatter?(symbol: string): Promise<IFormatter>;
}
export interface SuggestedQuantity {
	changed: IDelegate<(symbol: string) => void>;
	value(symbol: string): Promise<number>;
	setValue(symbol: string, value: number): void;
}
export interface IBrokerConnectionAdapterFactory {
	createDelegate<T extends Function>(): IDelegate<T>;
	createWatchedValue<T>(value?: T): IWatchedValue<T>;
}
export interface IBrokerConnectionAdapterHost {
	factory: IBrokerConnectionAdapterFactory;
	connectionStatusUpdate(status: ConnectionStatus, message?: string): void;
	defaultFormatter(symbol: string): Promise<IFormatter>;
	numericFormatter(decimalPlaces: number): Promise<IFormatter>;
	defaultContextMenuActions(context: ITradeContext, params?: DefaultContextMenuActionsParams): Promise<ActionMetaInfo[]>;
	defaultDropdownMenuActions(options?: Partial<DefaultDropdownActionsParams>): ActionMetaInfo[];
	floatingTradingPanelVisibility(): IWatchedValue<boolean>;
	domVisibility(): IWatchedValue<boolean>;
	silentOrdersPlacement(): IWatchedValue<boolean>;
	patchConfig(config: Partial<BrokerConfigFlags>): void;
	setDurations(durations: OrderDurationMetaInfo[]): void;
	orderUpdate(order: Order, isHistoryUpdate?: boolean): void;
	orderPartialUpdate(id: string, orderChanges: Partial<Order>): void;
	positionUpdate(position: Position, isHistoryUpdate?: boolean): void;
	positionPartialUpdate(id: string, positionChanges: Partial<Position>): void;
	tradeUpdate(trade: Trade, isHistoryUpdate?: boolean): void;
	tradePartialUpdate(id: string, tradeChanges: Partial<Trade>): void;
	executionUpdate(execution: Execution, isHistoryUpdate?: boolean): void;
	fullUpdate(): void;
	realtimeUpdate(symbol: string, data: TradingQuotes): void;
	plUpdate(positionId: string, pl: number): void;
	tradePLUpdate(tradeId: string, pl: number): void;
	equityUpdate(equity: number): void;
	domeUpdate(symbol: string, equity: DOMData): void;
	showOrderDialog<T extends PreOrder>(order: T, handler: (order: T, customFieldsResult?: CustomInputFieldsValues) => Promise<void>, focus?: OrderTicketFocusControl, options?: OrderDialogOptions): Promise<void>;
	showCancelOrderDialog(orderId: string, handler: () => void): Promise<void>;
	showCancelMultipleOrdersDialog(symbol: string, side: Side | undefined, qty: number, handler: () => void): Promise<void>;
	showCancelBracketsDialog(orderId: string, handler: () => void): Promise<void>;
	showCancelMultipleBracketsDialog(orderId: string, handler: () => void): Promise<void>;
	showClosePositionDialog(positionId: string, handler: () => void): Promise<void>;
	showReversePositionDialog(position: Position, handler: () => void): Promise<void>;
	showPositionBracketsDialog(position: Position | Trade, brackets: Brackets, focus: OrderTicketFocusControl | null, handler: (brackets: Brackets) => void): Promise<void>;
	showNotification(title: string, text: string, notificationType?: NotificationType): void;
	setButtonDropdownActions(descriptions: ActionMetaInfo[]): void;
	activateBottomWidget(): Promise<void>;
	showTradingProperties(): void;
	suggestedQty(): SuggestedQuantity;
	symbolSnapshot(symbol: string): Promise<QuotesBase>;
}
export interface IBrokerWithoutRealtime extends IBrokerCommon {
	subscribeDOME?(symbol: string): void;
	unsubscribeDOME?(symbol: string): void;
	cancelOrder(orderId: string, silently: boolean): Promise<void>;
	cancelOrders(symbol: string, side: Side | undefined, ordersIds: string[], silently: boolean): Promise<void>;
	reversePosition?(positionId: string, silently?: boolean): Promise<void>;
	closePosition(positionId: string, silently: boolean): Promise<void>;
	closeTrade?(tradeId: string, silently: boolean): Promise<void>;
	/**
	 * @deprecated Brokers should always send PL and equity updates
	 */
	subscribePL?(positionId: string): void;
	subscribeEquity?(): void;
	/**
	 * @deprecated
	 */
	unsubscribePL?(positionId: string): void;
	unsubscribeEquity?(): void;
}
export interface IBrokerTerminal extends IBrokerWithoutRealtime {
	subscribeRealtime(symbol: string): void;
	unsubscribeRealtime(symbol: string): void;
}
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
export interface ChartMetaInfo {
	id: string;
	name: string;
	symbol: string;
	resolution: ResolutionString;
	timestamp: number;
}
export interface ChartData {
	id: string;
	name: string;
	symbol: string;
	resolution: ResolutionString;
	content: string;
}
export interface StudyTemplateMetaInfo {
	name: string;
}
export interface StudyTemplateData {
	name: string;
	content: string;
}
export interface IExternalSaveLoadAdapter {
	getAllCharts(): Promise<ChartMetaInfo[]>;
	removeChart(chartId: string): Promise<void>;
	saveChart(chartData: ChartData): Promise<string>;
	getChartContent(chartId: string): Promise<string>;
	getAllStudyTemplates(): Promise<StudyTemplateMetaInfo[]>;
	removeStudyTemplate(studyTemplateInfo: StudyTemplateMetaInfo): Promise<void>;
	saveStudyTemplate(studyTemplateData: StudyTemplateData): Promise<void>;
	getStudyTemplateContent(studyTemplateInfo: StudyTemplateMetaInfo): Promise<string>;
}
export interface RestBrokerMetaInfo {
	url: string;
	access_token: string;
}
export interface AccessListItem {
	name: string;
	grayed?: boolean;
}
export interface AccessList {
	type: 'black' | 'white';
	tools: AccessListItem[];
}
export interface NumericFormattingParams {
	decimal_sign: string;
}
export declare type AvailableSaveloadVersions = '1.0' | '1.1';
export interface Overrides {
	[key: string]: string | number | boolean;
}
export interface WidgetBarParams {
	details?: boolean;
	watchlist?: boolean;
	news?: boolean;
	watchlist_settings?: {
		default_symbols: string[];
		readonly?: boolean;
	};
}
export interface RssNewsFeedInfo {
	url: string;
	name: string;
}
export declare type RssNewsFeedItem = RssNewsFeedInfo | RssNewsFeedInfo[];
export interface RssNewsFeedParams {
	default: RssNewsFeedItem;
	[symbolType: string]: RssNewsFeedItem;
}
export interface NewsProvider {
	is_news_generic?: boolean;
	get_news(symbol: string, callback: (items: NewsItem[]) => void): void;
}
export interface CustomFormatter {
	format(date: Date): string;
	formatLocal(date: Date): string;
}
export interface CustomFormatters {
	timeFormatter: CustomFormatter;
	dateFormatter: CustomFormatter;
}
export interface TimeFrameItem {
	text: string;
	resolution: ResolutionString;
	description?: string;
	title?: string;
}
export interface Favorites {
	intervals: ResolutionString[];
	chartTypes: string[];
}
export interface NewsItem {
	fullDescription: string;
	link?: string;
	published: number;
	shortDescription?: string;
	source: string;
	title: string;
}
export interface LoadingScreenOptions {
	foregroundColor?: string;
	backgroundColor?: string;
}
export interface InitialSettingsMap {
	[key: string]: string;
}
export interface ISettingsAdapter {
	initialSettings?: InitialSettingsMap;
	setValue(key: string, value: string): void;
	removeValue(key: string): void;
}
export declare type IBasicDataFeed = IDatafeedChartApi & IExternalDatafeed;
export declare type ThemeName = 'Light' | 'Dark';
export interface ChartingLibraryWidgetOptions {
	container_id: string;
	datafeed: IBasicDataFeed | (IBasicDataFeed & IDatafeedQuotesApi);
	interval: ResolutionString;
	symbol: string;
	auto_save_delay?: number;
	autosize?: boolean;
	debug?: boolean;
	disabled_features?: string[];
	drawings_access?: AccessList;
	enabled_features?: string[];
	fullscreen?: boolean;
	height?: number;
	library_path?: string;
	locale: LanguageCode;
	numeric_formatting?: NumericFormattingParams;
	saved_data?: object;
	studies_access?: AccessList;
	study_count_limit?: number;
	symbol_search_request_delay?: number;
	timeframe?: string;
	timezone?: 'exchange' | Timezone;
	toolbar_bg?: string;
	width?: number;
	charts_storage_url?: string;
	charts_storage_api_version?: AvailableSaveloadVersions;
	client_id?: string;
	user_id?: string;
	load_last_chart?: boolean;
	studies_overrides?: StudyOverrides;
	customFormatters?: CustomFormatters;
	overrides?: Overrides;
	snapshot_url?: string;
	indicators_file_name?: string;
	preset?: 'mobile';
	time_frames?: TimeFrameItem[];
	custom_css_url?: string;
	favorites?: Favorites;
	save_load_adapter?: IExternalSaveLoadAdapter;
	loading_screen?: LoadingScreenOptions;
	settings_adapter?: ISettingsAdapter;
	theme?: ThemeName;
}
export interface TradingTerminalWidgetOptions extends ChartingLibraryWidgetOptions {
	brokerConfig?: SingleBrokerMetaInfo;
	restConfig?: RestBrokerMetaInfo;
	widgetbar?: WidgetBarParams;
	rss_news_feed?: RssNewsFeedParams;
	news_provider?: NewsProvider;
	brokerFactory?(host: IBrokerConnectionAdapterHost): IBrokerWithoutRealtime | IBrokerTerminal;
}
export declare type LayoutType = 's' | '2h' | '2-1' | '2v' | '3h' | '3v' | '3s' | '4' | '6' | '8';
export declare type SupportedLineTools = 'text' | 'anchored_text' | 'note' | 'anchored_note' | 'double_curve' | 'arc' | 'icon' | 'arrow_up' | 'arrow_down' | 'arrow_left' | 'arrow_right' | 'price_label' | 'flag' | 'vertical_line' | 'horizontal_line' | 'horizontal_ray' | 'trend_line' | 'trend_angle' | 'arrow' | 'ray' | 'extended' | 'parallel_channel' | 'disjoint_angle' | 'flat_bottom' | 'pitchfork' | 'schiff_pitchfork_modified' | 'schiff_pitchfork' | 'balloon' | 'inside_pitchfork' | 'pitchfan' | 'gannbox' | 'gannbox_square' | 'gannbox_fixed' | 'gannbox_fan' | 'fib_retracement' | 'fib_trend_ext' | 'fib_speed_resist_fan' | 'fib_timezone' | 'fib_trend_time' | 'fib_circles' | 'fib_spiral' | 'fib_speed_resist_arcs' | 'fib_channel' | 'xabcd_pattern' | 'cypher_pattern' | 'abcd_pattern' | 'callout' | 'triangle_pattern' | '3divers_pattern' | 'head_and_shoulders' | 'fib_wedge' | 'elliott_impulse_wave' | 'elliott_triangle_wave' | 'elliott_triple_combo' | 'elliott_correction' | 'elliott_double_combo' | 'cyclic_lines' | 'time_cycles' | 'sine_line' | 'long_position' | 'short_position' | 'forecast' | 'date_range' | 'price_range' | 'date_and_price_range' | 'bars_pattern' | 'ghost_feed' | 'projection' | 'rectangle' | 'rotated_rectangle' | 'ellipse' | 'triangle' | 'polyline' | 'curve' | 'regression_trend' | 'cursor' | 'dot' | 'arrow_cursor' | 'eraser' | 'measure' | 'zoom' | 'brush';
export interface IOrderLineAdapter {
	remove(): void;
	onModify(callback: () => void): this;
	onModify<T>(data: T, callback: (data: T) => void): this;
	onMove(callback: () => void): this;
	onMove<T>(data: T, callback: (data: T) => void): this;
	getPrice(): number;
	setPrice(value: number): this;
	getText(): string;
	setText(value: string): this;
	getTooltip(): string;
	setTooltip(value: string): this;
	getQuantity(): string;
	setQuantity(value: string): this;
	getEditable(): boolean;
	setEditable(value: boolean): this;
	getExtendLeft(): boolean;
	setExtendLeft(value: boolean): this;
	getLineLength(): number;
	setLineLength(value: number): this;
	getLineStyle(): number;
	setLineStyle(value: number): this;
	getLineWidth(): number;
	setLineWidth(value: number): this;
	getBodyFont(): string;
	setBodyFont(value: string): this;
	getQuantityFont(): string;
	setQuantityFont(value: string): this;
	getLineColor(): string;
	setLineColor(value: string): this;
	getBodyBorderColor(): string;
	setBodyBorderColor(value: string): this;
	getBodyBackgroundColor(): string;
	setBodyBackgroundColor(value: string): this;
	getBodyTextColor(): string;
	setBodyTextColor(value: string): this;
	getQuantityBorderColor(): string;
	setQuantityBorderColor(value: string): this;
	getQuantityBackgroundColor(): string;
	setQuantityBackgroundColor(value: string): this;
	getQuantityTextColor(): string;
	setQuantityTextColor(value: string): this;
	getCancelButtonBorderColor(): string;
	setCancelButtonBorderColor(value: string): this;
	getCancelButtonBackgroundColor(): string;
	setCancelButtonBackgroundColor(value: string): this;
	getCancelButtonIconColor(): string;
	setCancelButtonIconColor(value: string): this;
}
export interface IPositionLineAdapter {
	remove(): void;
	onClose(callback: () => void): this;
	onClose<T>(data: T, callback: (data: T) => void): this;
	onModify(callback: () => void): this;
	onModify<T>(data: T, callback: (data: T) => void): this;
	onReverse(callback: () => void): this;
	onReverse<T>(data: T, callback: (data: T) => void): this;
	getPrice(): number;
	setPrice(value: number): this;
	getText(): string;
	setText(value: string): this;
	getTooltip(): string;
	setTooltip(value: string): this;
	getQuantity(): string;
	setQuantity(value: string): this;
	getExtendLeft(): boolean;
	setExtendLeft(value: boolean): this;
	getLineLength(): number;
	setLineLength(value: number): this;
	getLineStyle(): number;
	setLineStyle(value: number): this;
	getLineWidth(): number;
	setLineWidth(value: number): this;
	getBodyFont(): string;
	setBodyFont(value: string): this;
	getQuantityFont(): string;
	setQuantityFont(value: string): this;
	getLineColor(): string;
	setLineColor(value: string): this;
	getBodyBorderColor(): string;
	setBodyBorderColor(value: string): this;
	getBodyBackgroundColor(): string;
	setBodyBackgroundColor(value: string): this;
	getBodyTextColor(): string;
	setBodyTextColor(value: string): this;
	getQuantityBorderColor(): string;
	setQuantityBorderColor(value: string): this;
	getQuantityBackgroundColor(): string;
	setQuantityBackgroundColor(value: string): this;
	getQuantityTextColor(): string;
	setQuantityTextColor(value: string): this;
	getReverseButtonBorderColor(): string;
	setReverseButtonBorderColor(value: string): this;
	getReverseButtonBackgroundColor(): string;
	setReverseButtonBackgroundColor(value: string): this;
	getReverseButtonIconColor(): string;
	setReverseButtonIconColor(value: string): this;
	getCloseButtonBorderColor(): string;
	setCloseButtonBorderColor(value: string): this;
	getCloseButtonBackgroundColor(): string;
	setCloseButtonBackgroundColor(value: string): this;
	getCloseButtonIconColor(): string;
	setCloseButtonIconColor(value: string): this;
}
export declare type Direction = 'buy' | 'sell';
export interface IExecutionLineAdapter {
	remove(): void;
	getPrice(): number;
	setPrice(value: number): this;
	getTime(): number;
	setTime(value: number): this;
	getDirection(): Direction;
	setDirection(value: Direction): this;
	getText(): string;
	setText(value: string): this;
	getTooltip(): string;
	setTooltip(value: string): this;
	getArrowHeight(): number;
	setArrowHeight(value: number): this;
	getArrowSpacing(): number;
	setArrowSpacing(value: number): this;
	getFont(): string;
	setFont(value: string): this;
	getTextColor(): string;
	setTextColor(value: string): this;
	getArrowColor(): string;
	setArrowColor(value: string): this;
}
export declare type StudyInputId = Nominal<string, 'StudyInputId'>;
export interface StudyInputInfo {
	id: StudyInputId;
	name: string;
	type: string;
	localizedName: string;
}
export interface StudyInputValueItem {
	id: StudyInputId;
	value: StudyInputValueType;
}
export declare type StudyPriceScale = 'left' | 'right' | 'no-scale' | 'as-series';
export interface IStudyApi {
	isUserEditEnabled(): boolean;
	setUserEditEnabled(enabled: boolean): void;
	getInputsInfo(): StudyInputInfo[];
	getInputValues(): StudyInputValueItem[];
	setInputValues(values: StudyInputValueItem[]): void;
	mergeUp(): void;
	mergeDown(): void;
	unmergeUp(): void;
	unmergeDown(): void;
	changePriceScale(newPriceScale: StudyPriceScale): void;
	isVisible(): boolean;
	setVisible(visible: boolean): void;
	bringToFront(): void;
	sendToBack(): void;
	applyOverrides<TOverrides extends StudyOverrides>(overrides: TOverrides): void;
}
export interface TimePoint {
	time: number;
}
export interface StickedPoint extends TimePoint {
	channel: 'open' | 'high' | 'low' | 'close';
}
export interface PricedPoint extends TimePoint {
	price: number;
}
export declare type ShapePoint = StickedPoint | PricedPoint | TimePoint;
export interface ILineDataSourceApi {
	isSelectionEnabled(): boolean;
	setSelectionEnabled(enable: boolean): void;
	isSavingEnabled(): boolean;
	setSavingEnabled(enable: boolean): void;
	isShowInObjectsTreeEnabled(): boolean;
	setShowInObjectsTreeEnabled(enabled: boolean): void;
	isUserEditEnabled(): boolean;
	setUserEditEnabled(enabled: boolean): void;
	bringToFront(): void;
	sendToBack(): void;
	getProperties(): object;
	setProperties(newProperties: object): void;
	getPoints(): PricedPoint[];
	setPoints(points: ShapePoint[]): void;
}
export declare const enum PriceScaleMode {
	Normal = 0,
	Log = 1,
	Percentage = 2,
}
export interface IPriceScaleApi {
	getMode(): PriceScaleMode;
	setMode(newMode: PriceScaleMode): void;
}
export interface IPaneApi {
	hasMainSeries(): boolean;
	getLeftPriceScale(): IPriceScaleApi;
	getRightPriceScale(): IPriceScaleApi;
	getMainSourcePriceScale(): IPriceScaleApi | null;
}
export interface CrossHairMovedEventParams {
	time: number;
	price: number;
}
export interface VisibleTimeRange {
	from: number;
	to: number;
}
export interface VisiblePriceRange {
	from: number;
	to: number;
}
export declare type ChartActionId = 'chartProperties' | 'compareOrAdd' | 'scalesProperties' | 'tmzProperties' | 'paneObjectTree' | 'insertIndicator' | 'symbolSearch' | 'changeInterval' | 'timeScaleReset' | 'chartReset' | 'seriesHide' | 'studyHide' | 'lineToggleLock' | 'lineHide' | 'showLeftAxis' | 'showRightAxis' | 'scaleSeriesOnly' | 'drawingToolbarAction' | 'magnetAction' | 'stayInDrawingModeAction' | 'hideAllDrawingsAction' | 'hideAllMarks' | 'showCountdown' | 'showSeriesLastValue' | 'showSymbolLabelsAction' | 'showStudyLastValue' | 'showStudyPlotNamesAction' | 'undo' | 'redo' | 'paneRemoveAllStudiesDrawingTools';
export declare const enum SeriesStyle {
	Bars = 0,
	Candles = 1,
	Line = 2,
	Area = 3,
	HeikenAshi = 8,
	HollowCandles = 9,
	Renko = 4,
	Kagi = 5,
	PointAndFigure = 6,
	LineBreak = 7,
}
export declare type EntityId = Nominal<string, 'EntityId'>;
export interface EntityInfo {
	id: EntityId;
	name: string;
}
export interface CreateStudyOptions {
	checkLimit?: boolean;
	priceScale?: StudyPriceScale;
}
export interface CreateShapeOptions<TOverrides extends object> {
	shape?: 'arrow_up' | 'arrow_down' | 'flag' | 'vertical_line' | 'horizontal_line';
	text?: string;
	lock?: boolean;
	disableSelection?: boolean;
	disableSave?: boolean;
	disableUndo?: boolean;
	overrides?: TOverrides;
	zOrder?: 'top' | 'bottom';
	showInObjectsTree?: boolean;
}
export interface CreateStudyTemplateOptions {
	saveInterval?: boolean;
}
export interface SymbolExt {
	symbol: string;
	full_name: string;
	exchange: string;
	description: string;
	type: string;
}
export interface CreateTradingPrimitiveOptions {
	disableUndo?: boolean;
}
export interface IChartWidgetApi {
	onDataLoaded(): ISubscription<() => void>;
	onSymbolChanged(): ISubscription<() => void>;
	onIntervalChanged(): ISubscription<(interval: ResolutionString, timeFrameParameters: {
		timeframe?: string;
	}) => void>;
	onVisibleRangeChanged(): ISubscription<() => void>;
	dataReady(callback: () => void): boolean;
	crossHairMoved(callback: (params: CrossHairMovedEventParams) => void): void;
	setVisibleRange(range: VisibleTimeRange, callback: () => void): void;
	setSymbol(symbol: string, callback: () => void): void;
	setResolution(resolution: ResolutionString, callback: () => void): void;
	resetData(): void;
	executeActionById(actionId: ChartActionId): void;
	getCheckableActionState(actionId: ChartActionId): boolean;
	refreshMarks(): void;
	clearMarks(): void;
	setChartType(type: SeriesStyle): void;
	getAllShapes(): EntityInfo[];
	getAllStudies(): EntityInfo[];
	/**
	 * @deprecated Use shape/study API instead ([getStudyById] / [getShapeById])
	 */
	setEntityVisibility(entityId: EntityId, isVisible: boolean): void;
	createStudy<TStudyInputs extends StudyInputValueType, TOverrides extends StudyOverrides>(name: string, forceOverlay: boolean, lock?: boolean, inputs?: TStudyInputs[], callback?: (entityId: EntityId) => void, overrides?: TOverrides, options?: CreateStudyOptions): EntityId | null;
	getStudyById(entityId: EntityId): IStudyApi;
	createShape<TOverrides extends object>(point: ShapePoint, options: CreateShapeOptions<TOverrides>): EntityId | null;
	createMultipointShape<TOverrides extends object>(points: ShapePoint[], options: CreateShapeOptions<TOverrides>): EntityId | null;
	getShapeById(entityId: EntityId): ILineDataSourceApi;
	removeEntity(entityId: EntityId): void;
	removeAllShapes(): void;
	removeAllStudies(): void;
	createStudyTemplate(options: CreateStudyTemplateOptions): object;
	applyStudyTemplate(template: object): void;
	createOrderLine(options: CreateTradingPrimitiveOptions): IOrderLineAdapter;
	createPositionLine(options: CreateTradingPrimitiveOptions): IPositionLineAdapter;
	createExecutionShape(options: CreateTradingPrimitiveOptions): IExecutionLineAdapter;
	symbol(): string;
	symbolExt(): SymbolExt;
	resolution(): ResolutionString;
	getVisibleRange(): VisibleTimeRange;
	getVisiblePriceRange(): VisiblePriceRange;
	priceFormatter(): IFormatter;
	chartType(): SeriesStyle;
	setTimezone(timezone: 'exchange' | Timezone): void;
	getPanes(): IPaneApi[];
}
export interface WatchListSymbolList extends WatchListSymbolListData {
	id: string;
}
export interface WatchListSymbolListData {
	symbols: string[];
	title: string;
}
export interface WatchListSymbolListMap {
	[listId: string]: WatchListSymbolList;
}
export declare type WatchListSymbolListAddedCallback = (listId: string, symbols: string[]) => void;
export declare type WatchListSymbolListRemovedCallback = (listId: string) => void;
export declare type WatchListSymbolListRenamedCallback = (listId: string, oldName: string, newName: string) => void;
export declare type EditObjectDialogObjectType = 'mainSeries' | 'drawing' | 'study' | 'other';
export interface EditObjectDialogEventParams {
	objectType: EditObjectDialogObjectType;
	scriptTitle: string;
}
export interface MouseEventParams {
	clientX: number;
	clientY: number;
	pageX: number;
	pageY: number;
	screenX: number;
	screenY: number;
}
export interface StudyOrDrawingAddedToChartEventParams {
	value: string;
}
export declare type EmptyCallback = () => void;
export interface SubscribeEventsMap {
	toggle_sidebar: (isHidden: boolean) => void;
	indicators_dialog: EmptyCallback;
	toggle_header: (isHidden: boolean) => void;
	edit_object_dialog: (params: EditObjectDialogEventParams) => void;
	chart_load_requested: (savedData: object) => void;
	chart_loaded: EmptyCallback;
	mouse_down: (params: MouseEventParams) => void;
	mouse_up: (params: MouseEventParams) => void;
	drawing: (params: StudyOrDrawingAddedToChartEventParams) => void;
	study: (params: StudyOrDrawingAddedToChartEventParams) => void;
	undo: EmptyCallback;
	redo: EmptyCallback;
	reset_scales: EmptyCallback;
	compare_add: EmptyCallback;
	add_compare: EmptyCallback;
	'load_study template': EmptyCallback;
	onTick: (tick: Bar) => void;
	onAutoSaveNeeded: EmptyCallback;
	onScreenshotReady: (url: string) => void;
	onMarkClick: (markId: Mark['id']) => void;
	onTimescaleMarkClick: (markId: TimescaleMark['id']) => void;
	onSelectedLineToolChanged: EmptyCallback;
	layout_about_to_be_changed: (newLayoutType: LayoutType) => void;
	layout_changed: EmptyCallback;
	activeChartChanged: (chartIndex: number) => void;
}
export interface SaveChartToServerOptions {
	chartName?: string;
	defaultChartName?: string;
}
export interface WatchListApi {
	defaultList(): string[];
	getList(id?: string): string[] | null;
	getAllLists(): WatchListSymbolListMap | null;
	getActiveListId(): string | null;
	setList(symbols: string[]): void;
	updateList(listId: string, symbols: string[]): void;
	renameList(listId: string, newName: string): void;
	createList(listName?: string, symbols?: string[]): WatchListSymbolList | null;
	saveList(list: WatchListSymbolList): boolean;
	deleteList(listId: string): void;
	onListChanged(): ISubscription<EmptyCallback>;
	onActiveListChanged(): ISubscription<EmptyCallback>;
	onListAdded(): ISubscription<WatchListSymbolListAddedCallback>;
	onListRemoved(): ISubscription<WatchListSymbolListRemovedCallback>;
	onListRenamed(): ISubscription<WatchListSymbolListRenamedCallback>;
}
export interface GrayedObject {
	type: 'drawing' | 'study';
	name: string;
}
export interface ContextMenuItem {
	position: 'top' | 'bottom';
	text: string;
	click: EmptyCallback;
}
export interface DialogParams<CallbackType> {
	title: string;
	body: string;
	callback: CallbackType;
}
export interface SymbolIntervalResult {
	symbol: string;
	interval: ResolutionString;
}
export interface SaveLoadChartRecord {
	id: string;
	name: string;
	image_url: string;
	modified_iso: number;
	short_symbol: string;
	interval: ResolutionString;
}
export interface CreateButtonOptions {
	align: 'right' | 'left';
}
export interface IChartingLibraryWidget {
	onChartReady(callback: EmptyCallback): void;
	onGrayedObjectClicked(callback: (obj: GrayedObject) => void): void;
	onShortcut(shortCut: string, callback: EmptyCallback): void;
	subscribe<EventName extends keyof SubscribeEventsMap>(event: EventName, callback: SubscribeEventsMap[EventName]): void;
	unsubscribe<EventName extends keyof SubscribeEventsMap>(event: EventName, callback: SubscribeEventsMap[EventName]): void;
	chart(index?: number): IChartWidgetApi;
	setLanguage(lang: LanguageCode): void;
	setSymbol(symbol: string, interval: ResolutionString, callback: EmptyCallback): void;
	remove(): void;
	closePopupsAndDialogs(): void;
	selectLineTool(linetool: SupportedLineTools): void;
	selectedLineTool(): SupportedLineTools;
	save(callback: (state: object) => void): void;
	load(state: object): void;
	getSavedCharts(callback: (chartRecords: SaveLoadChartRecord[]) => void): void;
	loadChartFromServer(chartRecord: SaveLoadChartRecord): void;
	saveChartToServer(onComplete?: EmptyCallback, onFail?: EmptyCallback, saveAsSnapshot?: false, options?: SaveChartToServerOptions): void;
	removeChartFromServer(chartId: string, onCompleteCallback: EmptyCallback): void;
	onContextMenu(callback: (unixTime: number, price: number) => ContextMenuItem[]): void;
	createButton(options?: CreateButtonOptions): JQuery;
	showNoticeDialog(params: DialogParams<() => void>): void;
	showConfirmDialog(params: DialogParams<(confirmed: boolean) => void>): void;
	showLoadChartDialog(): void;
	showSaveAsChartDialog(): void;
	symbolInterval(): SymbolIntervalResult;
	mainSeriesPriceFormatter(): IFormatter;
	getIntervals(): string[];
	getStudiesList(): string[];
	addCustomCSSFile(url: string): void;
	applyOverrides<TOverrides extends StudyOverrides>(overrides: TOverrides): void;
	applyStudiesOverrides(overrides: object): void;
	watchList(): WatchListApi;
	activeChart(): IChartWidgetApi;
	chartsCount(): number;
	layout(): LayoutType;
	setLayout(layout: LayoutType): void;
	changeTheme(themeName: ThemeName): void;
	takeScreenshot(): void;
	lockAllDrawingTools(): IWatchedValue<boolean>;
}
export interface ChartingLibraryWidgetConstructor {
	new (options: ChartingLibraryWidgetOptions | TradingTerminalWidgetOptions): IChartingLibraryWidget;
}
export declare function version(): string;
export declare function onready(callback: () => void): void;
export declare const widget: ChartingLibraryWidgetConstructor;

export as namespace TradingView;
