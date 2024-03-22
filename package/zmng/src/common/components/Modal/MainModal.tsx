import { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

//멤버 생성 모달
interface MainModalProps {
  title: string;
  children: ReactNode;
  buttonList: ReactNode;
  show: boolean;
  handleClose: () => void;
}

function MainModal({
  children,
  title,
  show,
  buttonList,
  handleClose,
}: MainModalProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>{buttonList}</Modal.Footer>
      </Modal>
    </>
  );
}

export default MainModal;
