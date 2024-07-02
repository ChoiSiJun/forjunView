import { combineReducers, configureStore } from '@reduxjs/toolkit';
import MemberSlice from '@module/member/slice/MemberSlice';
import MemberListSlice from '@module/member/slice/MemberListSlice';
import SystemLocationSlice from '@module/system/slice/SystemLocationSlice';
import MenuSlice from '@common/slice/MenuSlice';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
const reducers = combineReducers({
  Menu: MenuSlice,
  Member: MemberSlice,
  MemberList: MemberListSlice,
  LocationList: SystemLocationSlice,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
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
