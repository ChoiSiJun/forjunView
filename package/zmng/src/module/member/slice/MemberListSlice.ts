import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TableFieldProps, AsyncThunkErrorProps } from '@common_type';

//Member List Axios 호출시 요청 타입
interface SearchQueryType {
  searchType: string;
  memberId: string;
  page: string;
  size: string;
  [key: string]: string; // 인덱스 시그니처 추가
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
  fieldList: TableFieldProps[];
}

const initialFileList: TableFieldProps[] = [
  {
    order: 1,
    key: 'memberId',
    name: '아이디',
    type: 'data',
  },
  {
    order: 2,
    key: 'memberName',
    name: '이름',
    type: 'data',
  },
  {
    order: 3,
    key: 'memberKey',
    name: '멤버키',
    type: 'data',
  },
  {
    order: 4,
    key: 'memberKey',
    name: '',
    type: 'button',
  },
];

//Member List Axios 초기상태
const initialState: MemeberListType = {
  requestData: {
    searchType: '',
    memberId: '',
    size: '5',
    page: '0',
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
  { rejectValue: AsyncThunkErrorProps }
>('member', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (SearchQuery[key] !== undefined) {
      params.append(key, SearchQuery[key]);
    }
  }
  try {
    const responseData = await axios.get(
      `http://localhost:8081/members/search?${params}`,
    );

    return responseData.data.content;
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
