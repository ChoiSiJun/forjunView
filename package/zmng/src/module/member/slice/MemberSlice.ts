import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorType } from '@common_type';
import axios from 'axios';

// member state type
export interface MemberType {
  memberKey?: string;
  memberId: string;
  memberWebId: string;
  loginPassword: string;
  memberName: string;
  gender?: string;
  email?: string;
  mobile?: string;
  address?: string;
  address_detail?: string;
  zipcode?: string;
  state?: string;
}

// memeber initial state
const initialState: MemberType = {
  memberKey: 'GUEST',
  memberId: '',
  memberWebId: '',
  loginPassword: '',
  memberName: '',
  gender: '',
  email: '',
  mobile: '',
  address: '',
  address_detail: '',
  zipcode: '',
  state: '',
};

//멤버생성처리
export const MemberGenerate = createAsyncThunk<
  MemberType,
  MemberType,
  { rejectValue: AsyncThunkErrorType }
>('post/member', async (member, thunkAPI) => {
  try {
    const responseData: MemberType = await axios.post(
      `http://localhost:8081/members/`,
      JSON.stringify(member),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return responseData;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
    });
  }
});

export const MemeberSlice = createSlice({
  // slice 이름정의
  name: 'memeber',

  // 초기값 세팅
  initialState,

  // 리듀서 기입
  reducers: {},
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(MemberGenerate.pending, () => {})
      // 통신 성공
      .addCase(MemberGenerate.fulfilled, () => {})
      // 통신 에러
      .addCase(MemberGenerate.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      });
  },
});

export default MemeberSlice.reducer;
