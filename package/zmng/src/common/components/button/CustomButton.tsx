import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface CustomButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CustomButton({
  buttonName = '',
  onClick = () => null,
}: CustomButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default CustomButton;
