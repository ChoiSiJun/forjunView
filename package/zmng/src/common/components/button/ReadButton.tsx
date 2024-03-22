import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ButtonProps } from '@common_type';

function ReadButton({
  buttonName = '조회',
  onClick = () => null,
}: ButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default ReadButton;
