import { configureStore } from '@reduxjs/toolkit';
import MemberSlice from '@module/member/slice/MemberSlice';
import MemberListSlice from '@module/member/slice/MemberListSlice';

export const store = configureStore({
  reducer: {
    Member: MemberSlice,
    MemberList: MemberListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
