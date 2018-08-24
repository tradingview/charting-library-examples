package com.tradingview.android

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast

class JSApplicationBridge(private val context: Context) {
    @JavascriptInterface
    fun onIntervalChanged(newInterval: String) {
        val toast = Toast.makeText(context, "New chart widget interval is $newInterval", Toast.LENGTH_SHORT)
        toast.show()
    }
}