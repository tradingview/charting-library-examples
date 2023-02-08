import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

function App({uri = 'index.html'}): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{uri}}
        allowFileAccessFromFileURLs={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={() => true}
      />
    </SafeAreaView>
  );
}

export function AndroidApp(): JSX.Element {
  return <App uri={'file:///android_asset/index.html'} />;
}

export function IOsApp(): JSX.Element {
  return <App uri={'index.html'} />;
}
