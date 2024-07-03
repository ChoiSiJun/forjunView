import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { CodeNameListState, MirCodeNameListItem } from '@common/components/molecule/MirCodeNameList';

const api_url = import.meta.env.VITE_SYSTEM_API;

const initialState: CodeNameListState = {
    codeNameList: [],
};

/**
 * 기관리스트 가져오기
 */
export const getLocationList = createAsyncThunk(
    "getLocationList",
    async (payload, thunkAPI) => {
        try {
            const responseData = await axios.get(
                `${api_url}/sys-system/locations`,
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
 * 기관코드 리스트 Slice
 */
export const LocationListSilce = createSlice({
    name: "LocationList",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLocationList.fulfilled, (state, { payload }) => {
            const tempList:MirCodeNameListItem[]=[];
            
            payload.forEach((data: { mloc: any; name_ko: any; }, index: any) => {
                const temp:MirCodeNameListItem={};

                temp.code = data.mloc;
                temp.name = data.name_ko;

                tempList.push(temp)
            });
            state.codeNameList = tempList;
        })
      .addCase(getLocationList.rejected, () => {})
    },
});

export default LocationListSilce.reducer;