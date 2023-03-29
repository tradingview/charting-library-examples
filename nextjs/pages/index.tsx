import Head from "next/head";
import { TVChartContainer } from "@/components/TVChartContainer";
import {
    ChartingLibraryWidgetOptions,
    ResolutionString,
} from "@/public/static/charting_library/charting_library";

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
    symbol: "AAPL",
    interval: "1D" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
};

export default function Home() {
    return (
        <>
            <Head>
                <title>TradingView Charting Library and Next.js</title>
            </Head>
            <main>
                <TVChartContainer {...defaultWidgetProps} />
            </main>
        </>
    );
}
