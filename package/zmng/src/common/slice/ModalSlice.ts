import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const ModalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpened(state) {
      state.isOpen = true;
    },
    modalClosed(state) {
      state.isOpen = false;
    },
  },
});

export const modalStatus = (state) => state.modals.isOpen;

export const { modalOpened, modalClosed } = ModalsSlice.actions;

export default ModalsSlice.reducer;