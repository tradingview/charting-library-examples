import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const IOsApp = () => {
  return (
    <SafeAreaView
        style={{flex:1}}
    >
        <WebView
            style={{flex: 1}}
            source={{ uri: 'index.html' }}
            allowFileAccessFromFileURLs={true}
            originWhitelist={["*"]}
            allowingReadAccessToURL={"*"}
        />
    </SafeAreaView>
  );
};
module.exports = IOsApp