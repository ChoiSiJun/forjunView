import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface MainModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  children: React.ReactNode;
}

const MainModal = ({ modal, setModal, children }: MainModalProps) => {
  //모달닫기 핸들러
  const handelCloseModal = () => {
    setModal(false);
  };

  return (
    <Modal
      open={modal}
      onClose={handelCloseModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ width: 400 }}>{children}</Box>
    </Modal>
  );
};

export default MainModal;
