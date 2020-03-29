import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { reducers } from 'src/store/reducers';
    
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore( reducers, composeEnhancer())
export const persistor = persistStore(store);