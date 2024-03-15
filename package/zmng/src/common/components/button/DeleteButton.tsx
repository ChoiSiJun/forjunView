import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ReactNode } from 'react';

interface DeleteButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function DeleteButton({ children, onClick }: DeleteButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

DeleteButton.defaultProps = { onClick: () => null };

export default DeleteButton;
