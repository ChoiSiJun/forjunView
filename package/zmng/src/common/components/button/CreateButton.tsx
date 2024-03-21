import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

interface CreateButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CreateButton({
  buttonName = '추가',
  onClick = () => null,
}: CreateButtonProps) {
  return <Button onClick={onClick}>{buttonName}</Button>;
}

export default CreateButton;
