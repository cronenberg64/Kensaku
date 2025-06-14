import { Platform } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';

if (Platform.OS === 'web') {
  AppRegistry.registerComponent('Kensaku', () => App);
  AppRegistry.runApplication('Kensaku', {
    rootTag: document.getElementById('root'),
  });
} else {
  AppRegistry.registerComponent('Kensaku', () => App);
} 