import { combineReducers, configureStore } from '@reduxjs/toolkit';

import MenuSlice from 'store/slice/MenuSlice';
import AuthSlice from 'store/slice/AuthSlice';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
const reducers = combineReducers({
  Menu: MenuSlice,
  Auth: AuthSlice,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['Auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
