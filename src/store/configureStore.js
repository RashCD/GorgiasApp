import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const middleware = [thunk, reduxLogger];

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
