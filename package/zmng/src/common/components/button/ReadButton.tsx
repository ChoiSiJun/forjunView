import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface ReadButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ReadButton({
  buttonName = '조회',
  onClick = () => null,
}: ReadButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default ReadButton;
