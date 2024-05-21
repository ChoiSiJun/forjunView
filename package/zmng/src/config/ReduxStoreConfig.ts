import { combineReducers, configureStore } from '@reduxjs/toolkit';
import MemberSlice from '@module/member/slice/MemberSlice';
import MemberListSlice from '@module/member/slice/MemberListSlice';
import MenuSlice from '@common/slice/MenuSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  Menu: MenuSlice,
  Member: MemberSlice,
  MemberList: MemberListSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Menu'],
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
