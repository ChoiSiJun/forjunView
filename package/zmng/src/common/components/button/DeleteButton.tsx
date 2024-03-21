import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface DeleteButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function DeleteButton({
  buttonName = '삭제',
  onClick = () => null,
}: DeleteButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default DeleteButton;
