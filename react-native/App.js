/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Platform, Alert, ToastAndroid} from 'react-native';

import {WebView} from 'react-native-webview';

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  const uri =
    Platform.OS === 'android'
      ? 'file:///android_asset/index.html'
      : 'index.html';

  const injectedJavascript = `
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

  const onMessage =
    Platform.OS === 'android'
      ? event => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'onIntervalChanged') {
            ToastAndroid.show(
              'Interval = ' + data.interval,
              ToastAndroid.SHORT,
            );
          }
        }
      : event => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'onIntervalChanged') {
            Alert.alert(
              'onIntervalChanged',
              'Interval = ' + data.interval,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: true},
            );
          }
        };

  return (
    <SafeAreaView style={backgroundStyle}>
      <WebView
        source={{uri}}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        originWhitelist={['*']}
        injectedJavaScript={injectedJavascript}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
};

export default App;
