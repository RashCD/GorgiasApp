import { Navigation } from 'react-native-navigation';

import Landing from './screens/Landing';
import Home from './screens/Home';
import VerticalCard from './screens/VerticalCard';

export function registerScreens(store, provider) {
	Navigation.registerComponent('Landing', () => Landing, store, provider);
    Navigation.registerComponent('Home', () => Home, store, provider);
    Navigation.registerComponent('VerticalCard', () => VerticalCard, store, provider);
}
