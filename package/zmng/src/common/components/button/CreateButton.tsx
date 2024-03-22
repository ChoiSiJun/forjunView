import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ButtonProps } from '@common_type';

function CreateButton({
  buttonName = '추가',
  onClick = () => null,
}: ButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}
export default CreateButton;
