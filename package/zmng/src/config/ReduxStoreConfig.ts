import { configureStore } from '@reduxjs/toolkit';
import MemberSlice from '@module/member/slice/MemberSlice';

export const store = configureStore({
  reducer: {
    Member: MemberSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
