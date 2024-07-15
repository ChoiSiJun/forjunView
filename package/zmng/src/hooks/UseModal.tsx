import { useAppDispatch } from '@config/ReduxHooks';
import {openModal, closeModal} from '@common/slice/ModalSlice'; 

export interface Props {
  type?:string;
  title?:string;
  subTitle?:string;
  size?:'sm' | 'md' | 'lg' | 'xl'
}

export interface ModalProps {
  type: string;
  title?:string;
  subTitle?:string;
  size?:string
}

const UseModal = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal  = ({type, title, subTitle, size}:ModalProps) => dispatch(openModal({type, title, subTitle, size}));

  const handleCloseModal = () => dispatch(closeModal());

  return {
    openModal: handleOpenModal, closeModal: handleCloseModal
  };
};

export default UseModal;