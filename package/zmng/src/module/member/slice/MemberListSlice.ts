import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FieldListType, AsyncThunkErrorType } from '@common_type';

//Member List Axios 호출시 요청 타입
interface SearchQueryType {
  searchType: string;
  searchKeyWord: string | undefined;
}

// MemberList 타입
interface MemberType {
  id: string;
  name: string;
  email: string;
}

//Member List Axios 반환 타입
interface MemeberListType {
  requestData: SearchQueryType;
  responseData: MemberType[];
  responseCode: number;
  loading: boolean;
  errorMessage: string | undefined;
  fieldList: FieldListType[];
}

const initialFileList = [
  {
    order: 1,
    key: 'id',
    name: '아이디',
  },
  {
    order: 2,
    key: 'name',
    name: '이름',
  },
  {
    order: 3,
    key: 'email',
    name: '이메일',
  },
];

//Member List Axios 초기상태
const initialState: MemeberListType = {
  requestData: {
    searchType: '',
    searchKeyWord: '',
  },
  responseData: [],
  responseCode: 404,
  loading: false,
  errorMessage: '',
  fieldList: initialFileList,
};

//비통기 통신 구현 createAsyncThunk :
//1. Member List 응답 타입
//2. Member List Axios 호출시 요청 인자 타입
//3. 추가파라미터 타입: 실패시 요청객체인 rejectValue에 대한 타입 설정

export const fetchMemberList = createAsyncThunk<
  MemberType[],
  SearchQueryType,
  { rejectValue: AsyncThunkErrorType }
>('member', async (inputData, thunkAPI) => {
  try {
    const responseData: MemberType[] = await axios.get(
      `https://localhost:3000/todos/${inputData}`,
    );

    return responseData;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: '알 수 없는 에러가 발생했습니다.',
    });
  }
});

export const MemeberListSlice = createSlice({
  // slice 이름정의
  name: 'memberList',

  // 초기값 세팅
  initialState,

  // 리듀서 기입
  reducers: {
    setMemberQuery: (state, action: PayloadAction<SearchQueryType>) => {
      state.requestData.searchKeyWord = action.payload.searchKeyWord;
      state.requestData.searchType = action.payload.searchType;
    },
  },
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(fetchMemberList.pending, () => {
        return {
          ...initialState,
          loading: true,
        };
      })
      // 통신 성공
      .addCase(fetchMemberList.fulfilled, (state, { payload }) => {
        state.responseCode = 200;
        state.responseData = payload;
        state.loading = false;
        state.errorMessage = '';
      })
      // 통신 에러
      .addCase(fetchMemberList.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage;
        state.loading = false;
      });
  },
});

export const { setMemberQuery } = MemeberListSlice.actions;
export default MemeberListSlice.reducer;
