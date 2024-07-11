import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosResponse, AxiosError } from 'axios';
import { AsyncThunkErrorProps } from '@common_type';

const api_url = import.meta.env.VITE_SYSTEM_API;

// Location Info
export interface LocationInfoState {
  mloc:string
  name_ko:string
  name_en?:string
  name_jp?:string
  name_cn?:string
  zipcode?:string
  address?:string
  address_detail?:string
  email?:string
  tel?:string
  fax?:string
}

// Location Info 초기값
const LocationInfoInit: LocationInfoState = {
  mloc: '',
  name_ko: '',
  name_en: '',
  name_jp: '',
  name_cn: '',
  zipcode: '',
  address: '',
  address_detail: '',
  email: '',
  tel: '',
  fax: ''
};

export interface LocationProps {
  locationInfo:LocationInfoState;
  isOpened:boolean;
}
const initialState: LocationProps = {
  locationInfo: LocationInfoInit,
  isOpened: false
};

/**
 * 기관정보 가져오기
 */
 export const getLocationInfo = createAsyncThunk(
  "getLocationInfo",
  async (mloc:string, thunkAPI) => {
      try {
          const responseData = await axios.get(
              `${api_url}/sys-system/locations/${mloc}`,
          );

          if (responseData.status !== 200) {
              throw new Error('응답코드 반환에러');
          }

          return responseData.data;

      } catch (error) {
          return thunkAPI.rejectWithValue({
            errorMessage: '알 수 없는 에러가 발생했습니다.',
            errorCode: 500,
          });
      }
  } 
)

/**
 * 기관정보 저장
 */
export const createLocation = createAsyncThunk<
  number,
  LocationProps,
  { rejectValue: AsyncThunkErrorProps }
>('post/locations', async (LocationProps, thunkAPI) => {
  return axios
    .post(`${api_url}/sys-system/locations`, JSON.stringify(LocationProps.locationInfo), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: AxiosResponse<LocationInfoState>) => {
      return response.status;
    })
    .catch((error: AxiosError<LocationInfoState>) => {
      return thunkAPI.rejectWithValue({
        errorMessage: error.message,
        errorCode: error.response?.status,
      });
    });
});



// location Slice
export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    //멤버 모달 닫기
    Modal: state => {
      state.isOpened = false;
      return state;
    },
  },
  extraReducers: builder => {
     builder
    //  .addCase(createLocation.rejected, (_, { payload }) => {
    //     console.log(payload?.errorMessage);
    //   })
     .addCase(getLocationInfo.fulfilled, (state, action) => {
        state.locationInfo = action.payload;
      })
      .addCase(createLocation.fulfilled, (state) => {
        state.isOpened = false;
      })
      .addCase(createLocation.rejected, (_, { payload }) => {
      })
  }
})

export const LocationInfoAction = LocationSlice.actions;
export default LocationSlice.reducer;