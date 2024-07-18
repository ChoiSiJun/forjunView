import { useAppDispatch } from '@config/ReduxHooks';
import {openModal, closeModal} from '@common/slice/ModalSlice'; 

export interface ModalProps {
  type: string;
}

const UseModal = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal  = ({type}:ModalProps) => dispatch(openModal({type}));

  const handleCloseModal = () => dispatch(closeModal());

  return {
    openModal: handleOpenModal, closeModal: handleCloseModal
  };
};

export default UseModal;