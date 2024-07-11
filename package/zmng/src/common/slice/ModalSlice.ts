import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

const ModalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpened(state) {
      state.isOpened = true;
    },
    modalClosed(state) {
      state.isOpened = false;
    },
  },
});

export const modalStatus = (state) => state.modals.isOpened;

export const { modalOpened, modalClosed } = ModalsSlice.actions;

export default ModalsSlice.reducer;