import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';


class AndroidChart extends Component {

    jsToInject = `
        tvWidget.onChartReady(function() {
            tvWidget.chart().onIntervalChanged().subscribe(
                null,
                function(interval) {
                    window.ReactNativeWebView.postMessage({ 
                        type: "onIntervalChanged",
                        interval: interval 
                    });
                }
            );
        });
        true; // note: this is required, or you'll sometimes get silent failures 
              // (https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)
    `;

    render() {
        return (
            <WebView
                style={{flex: 1}}
                source={{ uri: 'file:///android_asset/index.html' }}
                allowFileAccessFromFileURLs={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                originWhitelist={["*"]}
                onShouldStartLoadWithRequest={() => false}
                injectedJavaScript={this.jsToInject}
                onMessage={(event) => {
                    const data = event.nativeEvent.data
                    if (data.type == "onIntervalChanged") {
                        ToastAndroid.show("Interval = " + event.nativeEvent.data, ToastAndroid.SHORT);
                    }
                }}
            />
        );
    }
}

const AndroidApp = () => {
    return (
        <AndroidChart />        
    );
};
module.exports = AndroidApp