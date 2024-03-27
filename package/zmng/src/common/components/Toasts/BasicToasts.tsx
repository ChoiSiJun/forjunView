import Toast from 'react-bootstrap/Toast';

interface BasicToastProps {
  headerContent: string;
  bodyContent: string;
  show: boolean;
}

function BasicToast({ headerContent, bodyContent, show }: BasicToastProps) {
  return (
    <Toast show={show}>
      <Toast.Header>
        <strong className="me-auto">{headerContent}</strong>
      </Toast.Header>
      <Toast.Body>{bodyContent}</Toast.Body>
    </Toast>
  );
}

export default BasicToast;
