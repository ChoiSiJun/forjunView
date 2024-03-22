import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ButtonProps } from '@common_type';

function DeleteButton({
  buttonName = '삭제',
  onClick = () => null,
}: ButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default DeleteButton;
