function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(location.search);

	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

TradingView.onready(function() {
	var widget = window.tvWidget = new TradingView.widget({
			symbol: 'AAPL',
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
			interval: 'D',
			container_id: 'tv_chart_container',
			library_path: '/assets/charting_library/',

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: 'https://saveload.tradingview.com',
			charts_storage_api_version: '1.1',
			client_id: 'tradingview.com',
			user_id: 'public_user_id',
			fullscreen: false,
			autosize: true,
			studies_overrides: {},
	});

	widget.onChartReady(() => {
		const button = widget.createButton()
			.attr('title', 'Click to show a notification popup')
			.addClass('apply-common-tooltip')
			.on('click', () => widget.showNoticeDialog({
				title: 'Notification',
				body: 'TradingView Charting Library API works correctly',
				callback: () => {
					console.log('Noticed!');
				},
			}));

		button[0].innerHTML = 'Check API';
	});
});
