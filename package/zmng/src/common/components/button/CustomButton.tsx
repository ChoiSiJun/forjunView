import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ButtonProps } from '@common_type';

function CustomButton({ buttonName = '', onClick = () => null }: ButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default CustomButton;
