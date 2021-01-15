import React, { Component } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';


class IOsChart extends Component {

  jsToInject = `
      tvWidget.onChartReady(function() {
          tvWidget.chart().onIntervalChanged().subscribe(
              null,
              function(interval) {
                  const response = { type: "onIntervalChanged", interval: interval }
                  //window.ReactNativeWebView.postMessage accepts one argument, data, 
                  //which will be available on the event object, event.nativeEvent.data. data must be a string.
                  window.ReactNativeWebView.postMessage(JSON.stringify(response));
              }
          );
      });
      true; // note: this is required, or you'll sometimes get silent failures 
            // (https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)
  `;

  render() {
      return (
        <SafeAreaView
          style={{flex: 1}}
          >
          <WebView
              style={{flex: 1}}
              source={{ uri: 'index.html' }}
              allowFileAccessFromFileURLs={true}
              originWhitelist={["*"]}
              injectedJavaScript={this.jsToInject}
              onMessage={(event) => {
                  const data = JSON.parse(event.nativeEvent.data)
                  if (data.type == "onIntervalChanged") {
                      Alert.alert(
                        'onIntervalChanged',
                        "Interval = " + data.interval,
                        [
                          { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: true }
                      );
                  }
              }}
          />
        </SafeAreaView>
      );
  }
}

const IOsApp = () => {
  return (
    <IOsChart />        
  );
};
module.exports = IOsApp