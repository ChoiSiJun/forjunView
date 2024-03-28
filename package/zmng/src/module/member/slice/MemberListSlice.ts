import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  TableFieldProps,
  AsyncThunkErrorProps,
  TableDataProps,
  ResponseEntityProps,
} from '@common_type';

const api_url = import.meta.env.VITE_MEMBER_API;
//searchMemberListThunk Request Type
interface SearchMemberListProps {
  searchType: string;
  memberId: string;
  page: string;
  size: string;
}
//searchMemberList Props
interface searchMemberListProps {
  content: TableDataProps[];
}

//Member List Slice Props
interface MemeberListProps {
  memberDataList: TableDataProps[];
  memberFieldList: TableFieldProps[];
}

const memberFieldListInit: TableFieldProps[] = [
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

//Member List Slice 초기상태
const initialState: MemeberListProps = {
  memberDataList: [],
  memberFieldList: memberFieldListInit,
};

//비통기 통신 구현 createAsyncThunk :
//1. Member List 응답 타입
//2. Member List Axios 호출시 요청 인자 타입
//3. 추가파라미터 타입: 실패시 요청객체인 rejectValue에 대한 타입 설정

export const searchMemberList = createAsyncThunk<
  TableDataProps[],
  SearchMemberListProps,
  { rejectValue: AsyncThunkErrorProps }
>('member', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (Object.prototype.hasOwnProperty.call(SearchQuery, key)) {
      const typedKey = key as keyof SearchMemberListProps; // 타입 단언을 사용하여 실제 속성임을 명시
      if (SearchQuery[typedKey] !== undefined) {
        params.append(typedKey, SearchQuery[typedKey]);
      }
    }
  }
  try {
    const responseData: ResponseEntityProps<searchMemberListProps> =
      await axios.get(`${api_url}/members/search/member?${params}`);

    if (responseData.status !== 200) {
      throw new Error('응답코드 반환에러');
    }

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
  reducers: {},
  extraReducers: builder => {
    builder
      // 통신 중
      .addCase(searchMemberList.pending, () => {})
      // 통신 성공
      .addCase(searchMemberList.fulfilled, (state, { payload }) => {
        state.memberDataList = payload;
      })
      // 통신 에러
      .addCase(searchMemberList.rejected, () => {});
  },
});

export default MemeberListSlice.reducer;
