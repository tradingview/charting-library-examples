package com.tradingview.android

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import com.tradingview.android.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initWebView()
    }

    private fun initWebView() {
        val webView = binding.webview
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

                webView.evaluateJavascript(
                    """
                    tvWidget.onChartReady(function() {
                        tvWidget.chart().onIntervalChanged().subscribe(
                            null,
                            function(interval) {
                                ApplicationBridge.onIntervalChanged(interval);
                            }
                        );
                    });
                """
                ) {
                    // do nothing
                }
            }
        }

        // uncomment next line if you want to debug WebView in Chrome DevTools
        // WebView.setWebContentsDebuggingEnabled(true)

        ViewCompat.setOnApplyWindowInsetsListener(binding.root) { view, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.mandatorySystemGestures())

            view.updatePadding(
                left = systemBars.left,
                right = systemBars.right,
                top = systemBars.top,
                bottom = systemBars.bottom,
            )

            insets
        }

        webView.loadUrl(chartingLibraryUrl)
    }
}
