import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  type: string;
  isOpen: boolean;
}

const initialState = {
  type: null,
  isOpen: false,
};

export const modalSelector = (state) => state.modal;

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const {type} = action.payload;
      
      state.type = type;
      state.isOpen = true;
    },
    closeModal: () => {
      return initialState;
    }
  },
});


export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
