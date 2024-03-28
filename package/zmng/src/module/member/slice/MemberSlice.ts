import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps, ResponseEntityProps } from '@common_type';
import axios from 'axios';

const api_url = import.meta.env.VITE_MEMBER_API;

// MEMBER 정보 타입
export interface MemberDataProps {
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

// MEMBER 정보 초기값
const MemberDataInit: MemberDataProps = {
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

// MEMEBER slice 타입
export interface MemberProps {
  memberData: MemberDataProps;
  modal: boolean;
}

// MEMBER slice 초기값
const initialState: MemberProps = {
  memberData: MemberDataInit,
  modal: false,
};

//멤버생성처리
export const createMember = createAsyncThunk<
  MemberDataProps,
  MemberDataProps,
  { rejectValue: AsyncThunkErrorProps }
>('POST/MEMBER', async (member, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> = await axios.post(
      `${api_url}/members/`,
      JSON.stringify(member),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (responseData.status != 200) {
      throw new Error('응답오류');
    }

    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
    });
  }
});

//멤버 수정처리
export const updateMember = createAsyncThunk<
  MemberDataProps,
  MemberDataProps,
  { rejectValue: AsyncThunkErrorProps }
>('put/member', async (member, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> = await axios.put(
      `${api_url}/members/`,
      JSON.stringify(member),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (responseData.status != 200) {
      throw new Error('응답오류');
    }

    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
    });
  }
});

//멤버 삭제처리
export const deleteMember = createAsyncThunk<
  MemberDataProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('delete/member', async (memberKey, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> =
      await axios.delete(`${api_url}/members/${memberKey}`);

    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
    });
  }
});

//멤버 정보 열기
export const openMemberModal = createAsyncThunk<
  MemberDataProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('get/member', async (memberKey, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> = await axios.get(
      `${api_url}/members/${memberKey}`,
    );

    return responseData.data;
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
    closeMemberModal: state => {
      state.modal = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(createMember.pending, () => {})
      // 통신 성공
      .addCase(createMember.fulfilled, (state, { payload }) => {
        console.log(payload);
      })
      // 통신 에러
      .addCase(createMember.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      })
      // 통신 중
      .addCase(updateMember.pending, () => {})
      // 통신 성공
      .addCase(updateMember.fulfilled, state => {
        state.modal = false;
      })
      // 통신 에러
      .addCase(updateMember.rejected, state => {
        state.modal = false;
      })
      // 통신 중
      .addCase(deleteMember.pending, () => {})
      // 통신 성공
      .addCase(deleteMember.fulfilled, () => {})
      // 통신 에러
      .addCase(deleteMember.rejected, () => {})
      // 통신 중
      .addCase(openMemberModal.pending, () => {})
      // 통신 성공
      .addCase(openMemberModal.fulfilled, (state, { payload }) => {
        //가지고 온 이용자 데이터 넣기
        state.memberData = payload;
        state.modal = true;
      })
      // 통신 에러
      .addCase(openMemberModal.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      });
  },
});

export const { closeMemberModal } = MemeberSlice.actions;
export default MemeberSlice.reducer;
