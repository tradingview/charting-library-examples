/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// Currently only iOS available
const isAndroid = Platform.OS === 'android'

export default class App extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: isAndroid
            ? 'file:///android_asset/charting_library/index.html'
            : 'index.html'
        }}
        allowUniversalAccessFromFileURLs = { true }
        onShouldStartLoadWithRequest = { request => {
          return true
        }}
        useWebKit={false}
      />
    );
  }
}
