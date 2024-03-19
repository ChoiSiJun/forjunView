import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ReactNode } from 'react';

interface SearchButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function SearchButton({ children, onClick }: SearchButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

SearchButton.defaultProps = { onClick: () => null };

export default SearchButton;
