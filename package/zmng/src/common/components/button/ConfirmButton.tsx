import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface ConfirmButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ConfirmButton({
  buttonName = '확인',
  onClick = () => null,
}: ConfirmButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default ConfirmButton;
