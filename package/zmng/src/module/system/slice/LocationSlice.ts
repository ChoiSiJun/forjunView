import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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
  modal: boolean;
}

const initialState: LocationProps = {
  locationInfo: LocationInfoInit,
  modal: false,
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

export const LocationSlice = createSlice({
  name: "LocationInfo",
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
     builder.addCase(getLocationInfo.fulfilled, (state, action) => {
      state.locationInfo = action.payload;
     })
  }
})

export const LocationInfoAction = LocationSlice.actions;
export default LocationSlice.reducer;