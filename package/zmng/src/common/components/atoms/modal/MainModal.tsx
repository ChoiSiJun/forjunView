import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export interface MainModalProps {
  modalOpen: boolean;
  width?: number | string;
  closeModalEvent: (modal: boolean) => void;
  children: React.ReactNode;
}

const mainModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
};

const MainModal = ({
  modalOpen,
  closeModalEvent,
  width,
  children,
}: MainModalProps) => {
  //모달닫기 핸들러
  const handelCloseModal = () => {
    closeModalEvent(false);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handelCloseModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={mainModalStyle} width={width}>
        {children}
      </Box>
    </Modal>
  );
};

export default MainModal;
