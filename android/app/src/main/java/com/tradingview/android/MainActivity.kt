package com.tradingview.android

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initWebView()
    }

    private fun initWebView() {
        val webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.allowFileAccessFromFileURLs = true

        // to prevent scaling text
        // see https://github.com/tradingview/charting_library/issues/3267#issuecomment-415031298
        webView.settings.textZoom = 100

        val chartingLibraryUrl = "file:///android_asset/charting_library/index.html"
        val jsBridge = JSApplicationBridge(this)
        webView.addJavascriptInterface(jsBridge, "ApplicationBridge")

        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)

                if (!url.equals(chartingLibraryUrl)) {
                    return
                }

                webView.evaluateJavascript("""
                    tvWidget.onChartReady(function() {
                        tvWidget.chart().onIntervalChanged().subscribe(
                            null,
                            function(interval) {
                                ApplicationBridge.onIntervalChanged(interval);
                            }
                        );
                    });
                """) {
                    // do nothing
                }
            }
        }

        // uncomment next line if you want to debug WebView in Chrome DevTools
        // WebView.setWebContentsDebuggingEnabled(true)

        webView.loadUrl(chartingLibraryUrl)
        setContentView(webView)
    }
}
