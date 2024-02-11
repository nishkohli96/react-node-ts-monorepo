import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { settingsSlice } from './reducers';
import { pokeApi } from './services';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ settings: settingsSlice.reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions */
export const store = configureStore({
  reducer: {
    appConfig: persistedReducer,
    [pokeApi.reducerPath]: pokeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        ],
      },
    }).concat([pokeApi.middleware]),
});

export const persistor = persistStore(store);
