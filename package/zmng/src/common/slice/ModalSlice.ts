import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  type: string;
  isOpen: boolean;
  title?:string;
  subTitle?:string;
  size?:'sm' | 'md' | 'lg' | 'xl';
}

const initialState = {
  type: null,
  isOpen: false,
  title: null,
  subTitle: null,
  size: 'sm'
};

export const modalSelector = (state) => state.modal;

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const {type, title, subTitle, size} = action.payload;
      
      state.type = type;
      state.isOpen = true;
      state.title = title;
      state.subTitle = subTitle;
      state.size = size;
    },
    closeModal: () => {
      return initialState;
    }
  },
});


export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
