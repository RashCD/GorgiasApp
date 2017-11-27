
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { registerScreens } from './routes';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
	screen: {
		screen: 'Landing',
		title: 'Welcome'
	}
});
