import { createSlice } from '@reduxjs/toolkit';

interface ModuleInfo {
  moduleName: string;
  modulePath: string;
}

const initialState: ModuleInfo = {
  moduleName: '',
  modulePath: '',
};

//Module
export const ModuleInfoSlice = createSlice({
  name: 'moduleInfo',
  initialState,
  reducers: {},
});

export default ModuleInfoSlice.reducer;
