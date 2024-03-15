import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ReactNode } from 'react';

interface UpdateButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function UpdateButton({ children, onClick }: UpdateButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

UpdateButton.defaultProps = { onClick: () => null };

export default UpdateButton;
