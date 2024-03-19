import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface MemberListErrorType {
  errorMessage: string;
}

//Member List Axios 호출시 요청 타입
interface SearchQueryType {
  searchType: string;
  searchKeyWord: string;
}

// Member List 응답 타입
interface MemberType {
  id: string;
  name: string;
  email: string;
}

interface CoulmnType {
  key: string;
  name: string;
}

interface TotalData extends MemberType {
  columnList: CoulmnType;
}

//Member List Axios 반환 타입
interface MemeberListType {
  RequestData: SearchQueryType;
  TableHead: CoulmnType[];
  ResponseData: MemberType[];
  ResponseCode: number;
  loading: boolean;
  errorMessage: string | undefined;
}

//Member List Axios 초기상태
const initialState: MemeberListType = {
  TableHead: [],
  RequestData: {
    searchType: '',
    searchKeyWord: '',
  },

  ResponseData: [],
  ResponseCode: 404,
  loading: false,
  errorMessage: '',
};

//비통기 통신 구현 createAsyncThunk :
//1. Member List 응답 타입
//2. Member List Axios 호출시 요청 타입
//3. 추가파라미터 타입: 실패시 요청객체인 rejectValue에 대한 타입 설정

const fetchMemberList = createAsyncThunk<
  MemberType[],
  SearchQueryType,
  { rejectValue: MemberListErrorType }
>('member/list', async (inputData, thunkAPI) => {
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
      state.RequestData.searchKeyWord = action.payload.searchKeyWord;
      state.RequestData.searchType = action.payload.searchType;
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
        state.ResponseCode = 200;
        state.ResponseData = payload;
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
