import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import IOsApp from './app/ios.app';
import AndroidApp from './app/android.app';

AppRegistry.registerComponent(appName, () => {
    if (Platform.OS === 'android') {
        return AndroidApp
    } else {
        return IOsApp
    }
});