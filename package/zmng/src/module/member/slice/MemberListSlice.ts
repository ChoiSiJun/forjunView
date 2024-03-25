import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ButtonComponent } from '@common_components_ui';
import axios from 'axios';
import {
  TableFieldProps,
  AsyncThunkErrorProps,
  TableDataProps,
} from '@common_type';

//Member List Axios 호출시 요청 타입
interface SearchQueryProps {
  searchType: string;
  memberId: string;
  page: string;
  size: string;
}

//Member List Axios 반환 타입
interface MemeberListProps {
  requestData: SearchQueryProps;
  responseData: TableDataProps[];
  responseCode: number;
  loading: boolean;
  errorMessage: string | undefined;
  tableFieldList: TableFieldProps[];
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
    buttonArray: [
      ButtonComponent.UpdateButton({ buttonName: 'example1' }),
      ButtonComponent.UpdateButton({ buttonName: 'example2' }),
    ],
  },
];

//Member List Axios 초기상태
const initialState: MemeberListProps = {
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
  tableFieldList: initialFileList,
};

//비통기 통신 구현 createAsyncThunk :
//1. Member List 응답 타입
//2. Member List Axios 호출시 요청 인자 타입
//3. 추가파라미터 타입: 실패시 요청객체인 rejectValue에 대한 타입 설정

export const fetchMemberList = createAsyncThunk<
  TableDataProps[],
  SearchQueryProps,
  { rejectValue: AsyncThunkErrorProps }
>('member', async (SearchQuery, thunkAPI) => {
  const params = new URLSearchParams();
  for (const key in SearchQuery) {
    if (Object.prototype.hasOwnProperty.call(SearchQuery, key)) {
      const typedKey = key as keyof SearchQueryProps; // 타입 단언을 사용하여 실제 속성임을 명시
      if (SearchQuery[typedKey] !== undefined) {
        params.append(typedKey, SearchQuery[typedKey]);
      }
    }
  }
  try {
    const responseData = await axios.get(
      `http://192.168.5.89:8081/members/search?${params}`,
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
    setMemberQuery: (state, action: PayloadAction<SearchQueryProps>) => {
      state.requestData.memberId = action.payload.memberId;
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
