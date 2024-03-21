import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface CancelButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CancelButton({
  buttonName = '취소',
  onClick = () => null,
}: CancelButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default CancelButton;
