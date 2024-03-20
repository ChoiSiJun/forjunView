import { ReactElement } from 'react';

interface ButtonContainerType {
  Children: ReactElement;
}

function ButtonContainer({ Children }: ButtonContainerType) {
  return { Children };
}

export default ButtonContainer;
