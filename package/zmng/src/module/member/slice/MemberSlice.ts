import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps } from '@common_type';
import axios from 'axios';

// MEMBER 정보 타입
export interface MemberInfoProps {
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

// MEMEBER slice 타입
export interface MemberProps {
  memberInfo: MemberInfoProps;
  modal: boolean;
}

// MEMBER 정보 초기값
const MemberInfoInit: MemberInfoProps = {
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

// MEMBER slice 초기값
const initialState: MemberProps = {
  memberInfo: MemberInfoInit,
  modal: false,
};

//멤버생성처리
export const MemberGenerate = createAsyncThunk<
  MemberInfoProps,
  MemberInfoProps,
  { rejectValue: AsyncThunkErrorProps }
>('post/member', async (member, thunkAPI) => {
  try {
    const responseData: MemberInfoProps = await axios.post(
      `http://192.168.5.89:8081/members/`,
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

//멤버 정보 + 수정 모달
export const MemberUpdate = createAsyncThunk<
  MemberInfoProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('get/member', async (memberKey, thunkAPI) => {
  try {
    const responseData: MemberInfoProps = await axios.get(
      `http://192.168.5.89:8081/members/${memberKey}`,
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
  reducers: {
    //멤버 모달 닫기
    closeModal: state => {
      state.modal = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(MemberGenerate.pending, () => {})
      // 통신 성공
      .addCase(MemberGenerate.fulfilled, () => {})
      // 통신 에러
      .addCase(MemberGenerate.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      })
      // 통신 중
      .addCase(MemberUpdate.pending, () => {})
      // 통신 성공
      .addCase(MemberUpdate.fulfilled, (state, { payload }) => {
        //가지고 온 이용자 데이터 넣기
        state.memberInfo = payload;
        state.modal = true;

        //모달 오픈
      })
      // 통신 에러
      .addCase(MemberUpdate.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      });
  },
});

export const { closeModal } = MemeberSlice.actions;
export default MemeberSlice.reducer;
