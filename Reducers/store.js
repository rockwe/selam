import {applyMiddleware, createStore, compose} from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import {AsyncStorage} from 'react-native';
import middleware from './middleware';
import reducers from './reducer';
import storage from 'redux-persist/lib/storage'

const enhancers = [applyMiddleware(...middleware)];

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers =
    (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
};

let reducer= persistCombineReducers(rootPersistConfig, reducers);

const store = createStore(reducer, enhancer);

persistStore(store, null,() => {
    store.getState() // if you to get restoredState
}
);
export default store;
