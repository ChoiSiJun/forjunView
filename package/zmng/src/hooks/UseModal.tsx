import { useAppDispatch } from '@config/ReduxHooks';
import {modalOpened, modalClosed} from '@common/slice/ModalSlice'; 

const UseModal = () => {
  const dispatch = useAppDispatch();

  const openModal = () => dispatch(modalOpened());

  const closeModal = () => dispatch(modalClosed());

  return {
    // isModalOpen,
    openModal,
    closeModal,
  };
};

export default UseModal;