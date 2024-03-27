import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkErrorProps, ResponseEntityProps } from '@common_type';
import axios from 'axios';

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
const MemberInfoInit: MemberDataProps = {
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
  memberInfo: MemberDataProps;
  modal: boolean;
}

// MEMBER slice 초기값
const initialState: MemberProps = {
  memberInfo: MemberInfoInit,
  modal: false,
};

//멤버생성처리
export const MemberCreate = createAsyncThunk<
  MemberDataProps,
  MemberDataProps,
  { rejectValue: AsyncThunkErrorProps }
>('post/member', async (member, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> = await axios.post(
      `http://127.0.0.1:8081/members/`,
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
export const MemberUpdate = createAsyncThunk<
  MemberDataProps,
  MemberDataProps,
  { rejectValue: AsyncThunkErrorProps }
>('put/member', async (member, thunkAPI) => {
  try {
    console.log(JSON.stringify(member));
    const responseData: ResponseEntityProps<MemberDataProps> = await axios.put(
      `http://127.0.0.1:8081/members/`,
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
export const MemberDelete = createAsyncThunk<
  MemberDataProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('delete/member', async (memberKey, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> =
      await axios.delete(`http://192.168.5.89:8081/members/${memberKey}`);

    return responseData.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
    });
  }
});

//멤버 정보 가져오기
export const searchMemberThunk = createAsyncThunk<
  MemberDataProps,
  string,
  { rejectValue: AsyncThunkErrorProps }
>('get/member', async (memberKey, thunkAPI) => {
  try {
    const responseData: ResponseEntityProps<MemberDataProps> = await axios.get(
      `http://192.168.5.89:8081/members/${memberKey}`,
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
    //멤버 모달 열기
    openModal: state => {
      state.modal = true;
      return state;
    },

    //멤버 모달 닫기
    closeModal: state => {
      state.modal = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(MemberCreate.pending, () => {})
      // 통신 성공
      .addCase(MemberCreate.fulfilled, (state, { payload }) => {
        console.log(payload);
      })
      // 통신 에러
      .addCase(MemberCreate.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      })
      // 통신 중
      .addCase(MemberUpdate.pending, () => {})
      // 통신 성공
      .addCase(MemberUpdate.fulfilled, state => {
        state.modal = false;
      })
      // 통신 에러
      .addCase(MemberUpdate.rejected, state => {
        state.modal = false;
      })
      // 통신 중
      .addCase(MemberDelete.pending, () => {})
      // 통신 성공
      .addCase(MemberDelete.fulfilled, () => {})
      // 통신 에러
      .addCase(MemberDelete.rejected, () => {})
      // 통신 중
      .addCase(searchMemberThunk.pending, () => {})
      // 통신 성공
      .addCase(searchMemberThunk.fulfilled, (state, { payload }) => {
        //가지고 온 이용자 데이터 넣기
        state.memberInfo = payload;
        state.modal = true;
      })
      // 통신 에러
      .addCase(searchMemberThunk.rejected, (state, { payload }) => {
        console.log(payload?.errorMessage);
      });
  },
});

export const { openModal, closeModal } = MemeberSlice.actions;
export default MemeberSlice.reducer;
