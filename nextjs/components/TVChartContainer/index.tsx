import styles from "./index.module.css";
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, IBasicDataFeed, IDatafeedQuotesApi, LanguageCode, ResolutionString, widget } from "@/public/static/charting_library";

// ideally move to window.d.ts
// refer to documentation https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/#constructor
interface DatafeedsType {
    UDFCompatibleDatafeed: new (
        // This is a URL of a data server that will receive requests and return data.
        datafeedURL: string,
        updateFrequency?: number | undefined,
        limitedServerResponse?:
            | {
            // Possible values: 'latestFirst' | 'earliestFirst'. If the server can't return all the required bars in a single response then expectedOrder specifies whether the server will send the latest (newest) or earliest (older) data first.
            expectedOrder: 'latestFirst' | 'earliestFirst';
            // Set this value to the maximum number of bars which the data backend server can supply in a single response. This doesn't affect or change the library behavior regarding how many bars it will request. It just allows this Datafeed implementation to correctly handle this situation.
            maxResponseLength: number;
        }
            | undefined,
    ) => IBasicDataFeed | (IBasicDataFeed & IDatafeedQuotesApi);
}

declare global {
    interface Window {
        Datafeeds: DatafeedsType;
    }
}

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
	const chartContainerRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
				"https://demo_feed.tradingview.com",
				undefined,
				{
					maxResponseLength: 1000,
					expectedOrder: "latestFirst",
				}
			),
			interval: props.interval as ResolutionString,
			container: chartContainerRef.current,
			library_path: props.library_path,
			locale: props.locale as LanguageCode,
			disabled_features: ["use_localstorage_for_settings"],
			enabled_features: ["study_templates"],
			charts_storage_url: props.charts_storage_url,
			charts_storage_api_version: props.charts_storage_api_version,
			client_id: props.client_id,
			user_id: props.user_id,
			fullscreen: props.fullscreen,
			autosize: props.autosize
		};

		const tvWidget = new widget(widgetOptions);

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute("title", "Click to show a notification popup");
				button.classList.add("apply-common-tooltip");
				button.addEventListener("click", () =>
					tvWidget.showNoticeDialog({
						title: "Notification",
						body: "TradingView Charting Library API works correctly",
						callback: () => {
							console.log("Noticed!");
						},
					})
				);

				button.innerHTML = "Check API";
			});
		});

		return () => {
			tvWidget.remove();
		};
	}, [props]);

	return (
		<>
			<header className={styles.VersionHeader}>
				<h1>
					TradingView Charting Library and Next.js Integration Example
				</h1>
			</header>
			<div ref={chartContainerRef} className={styles.TVChartContainer} />
		</>
	);
};
