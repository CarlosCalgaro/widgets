import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import authentication from 'src/store/reducers/authentication';
import widgets from 'src/store/reducers/widgets'
const persistConfig = {
    key: 'access_token',
    storage: storage, 
    whitelist: ['access_token', 'token_type', 'expires_in', 'refresh_token', 'scope', 'created_at'],
    stateReconciler: autoMergeLevel2,
}


export const reducers = combineReducers({
    authentication: persistReducer(persistConfig, authentication),
    widgets: widgets
}); 