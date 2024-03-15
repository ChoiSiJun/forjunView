import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ReactNode } from 'react';

interface InsertButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function InsertButton({ children, onClick }: InsertButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

InsertButton.defaultProps = { onClick: () => null };

export default InsertButton;
