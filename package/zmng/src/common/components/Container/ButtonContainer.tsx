import { ReactElement } from 'react';

interface ButtonContainerProps {
  Children: ReactElement;
}

function ButtonContainer({ Children }: ButtonContainerProps) {
  return { Children };
}

export default ButtonContainer;
