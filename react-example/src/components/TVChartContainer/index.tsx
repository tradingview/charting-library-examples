import * as React from 'react';
import './index.css';
import {
	ChartingLibraryWidgetOptions,
	IBasicDataFeed,
	IDatafeedQuotesApi,
	ResolutionString,
	AccessList,
	LanguageCode,
	NumericFormattingParams,
	Timezone,
	AvailableSaveloadVersions,
	StudyOverrides,
	CustomFormatters,
	Overrides,
	Favorites,
	IExternalSaveLoadAdapter,
	LoadingScreenOptions,
	ISettingsAdapter
} from '../../../public/charting_library/charting_library.min';

export interface ChartContainerProps {
	symbol?: string;
	interval?: ResolutionString;
	containerId?: string;
	datafeed?: IBasicDataFeed | (IBasicDataFeed & IDatafeedQuotesApi);
	datafeedUrl?: string;
	autoSaveDelay?: number;
	autosize?: boolean;
	debug?: boolean;
	disabledFeatures?: string[];
	drawingsAccess?: AccessList;
	enabledFeatures?: string[];
	fullscreen?: boolean;
	height?: number;
	libraryPath?: string;
	locale?: LanguageCode;
	numericFormatting?: NumericFormattingParams;
	savedData?: object;
	studiesAccess?: AccessList;
	studyCountLimit?: number;
	symbolSearchRequestDelay?: number;
	timezone?: 'exchange' | Timezone;
	toolbarBg?: string;
	width?: number;
	chartsStorageUrl?: string;
	chartsStorageApiVersion?: AvailableSaveloadVersions;
	clientId?: string;
	userId?: string;
	loadLastChart?: boolean;
	studiesOverrides?: StudyOverrides;
	customFormatters?: CustomFormatters;
	overrides?: Overrides;
	snapshotUrl?: string;
	indicatorsFileName?: string;
	preset?: 'mobile';
	customCssUrl?: string;
	favorites?: Favorites;
	saveLoadAdapter?: IExternalSaveLoadAdapter;
	loadingScreen?: LoadingScreenOptions;
	settingsAdapter?: ISettingsAdapter;
}

export interface ChartContainerState {
}

function getParameterByName(name: string) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent<ChartContainerProps, ChartContainerState> {
	public static defaultProps: ChartContainerProps = {
		symbol: 'AAPL',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: 'charting_library/',
		chartsStorageUrl: 'http://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	public constructor(props: ChartContainerProps) {
		super(props);
	}

	public componentDidMount(): void {
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: this.props.symbol as string,
			interval: this.props.interval as ResolutionString,
			container_id: this.props.containerId as string,
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			library_path: this.props.libraryPath,
			locale: (getParameterByName('lang') || 'en') as LanguageCode,
			// Regression Trend-related functionality is not implemented yet, so it's hidden for a while
			drawings_access: { type: 'black', tools: [ { name: 'Regression Trend' } ] },
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides as StudyOverrides,
		};

		// tslint:disable-next-line:no-any
		(window as any).TradingView.onready(() => {
			// tslint:disable-next-line:no-any
			const widget = (window as any).tvWidget = new (window as any).TradingView.widget(widgetOptions);

			widget.onChartReady(() => {
				widget.createButton()
					.attr('title', 'Click to show a notification popup')
					.addClass('apply-common-tooltip')
					.on('click', () => widget.showNoticeDialog({
						title: 'Notification',
						body: 'TradingView Charting Library API works correctly',
					}))[0].innerHTML = 'Check API';
			});
		});
	}

	public render(): JSX.Element {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}