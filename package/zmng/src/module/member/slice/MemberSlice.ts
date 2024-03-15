import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// member state type
export interface MemberState {
  id: string;
  name: string;
  email: string;
}

// memeber initial state
const initialState: MemberState = {
  id: 'testid',
  name: '미르테크',
  email: 'sjchoi@mirtech.co.kr',
};

export const MemeberSlice = createSlice({
  // slice 이름정의
  name: 'memeber',

  // 초기값 세팅
  initialState,

  // 리듀서 기입
  reducers: {
    alterEmail: state => {
      const TempState = state;
      TempState.email = 'alteremali@mirtech.co.kr';
      return TempState;
    },

    alterEmaliByPayload: (state, action: PayloadAction<string>) => {
      const TempState = state;
      TempState.email = action.payload;
      return TempState;
    },
  },
});

export const { alterEmail, alterEmaliByPayload } = MemeberSlice.actions;
export default MemeberSlice.reducer;
