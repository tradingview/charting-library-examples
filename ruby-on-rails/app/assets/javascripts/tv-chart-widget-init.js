function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(location.search);

	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.getElementById('header-text').textContent += TradingView.version();

function initOnReady() {
	var widget = window.tvWidget = new TradingView.widget({
			symbol: 'AAPL',
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'),
			interval: 'D',
			container: document.getElementById('tv_chart_container'),
			library_path: '/charting_library/',

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
		widget.headerReady().then(() => {
			const button = widget.createButton();

			button.setAttribute('title', 'Click to show a notification popup');
			button.classList.add('apply-common-tooltip');

			button.addEventListener('click', () => widget.showNoticeDialog({
				title: 'Notification',
				body: 'TradingView Charting Library API works correctly',
				callback: () => {
					console.log('Noticed!');
				},
			}));

			button.innerHTML = 'Check API';
		});
	});
};

window.addEventListener('DOMContentLoaded', initOnReady, false);
