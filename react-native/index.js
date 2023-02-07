import {AppRegistry, Platform} from 'react-native';
import {AndroidApp, IOsApp} from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => {
  if (Platform.OS === 'android') {
    return AndroidApp;
  }
  return IOsApp;
});
