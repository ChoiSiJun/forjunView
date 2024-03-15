import { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

interface MainModalProps {
  Title: string;
  Content: string;
  Button: ReactNode;
}

function MainModal({ Title, Content, Button }: MainModalProps) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{Content}</p>
        </Modal.Body>

        <Modal.Footer>{Button}</Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default MainModal;
