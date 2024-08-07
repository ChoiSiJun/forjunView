import { createSlice } from '@reduxjs/toolkit';
import MirModalPortal from '@common/components/atoms/modal/MirModalPortal';

export interface ModalState {
  isOpen: boolean;
  //children: React.ReactNode | undefined
}

const initialState = {
  isOpen: false,
  //children: undefined 
};

const ModalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpened(state) {
      state.isOpen = true;
      //state.children = "<MirModalPortal />";
    },
    modalClosed(state) {
      state.isOpen = false;
    },
  },
});

export const modalStatus = (state) => state.modals.isOpen;

export const { modalOpened, modalClosed } = ModalsSlice.actions;

export default ModalsSlice.reducer;