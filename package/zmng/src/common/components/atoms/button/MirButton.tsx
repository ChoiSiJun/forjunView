import { styled } from '@mui/material';
import Button from '@mui/material/Button';

export const MirButtonGuide = {
  title: '버튼',
  code: `
  const clickHandler = () => {
    alert('클릭동작!!');
  };
  <MirButton ButtonType={'default'} buttonName={'기본'} onClick={clickHandler}/>
`,
  requireNote: [
    `ButtonType : 버튼 종류 ('default' | 'create' | 'read' | 'delete' |'update' | 'export' | 'etc')`,
    'buttonName: 버튼이름',
  ],
  optionNote: ['onClick: 클릭이벤트'],
};

interface MirButtonProps {
  ButtonType:
    | 'default'
    | 'create'
    | 'read'
    | 'update'
    | 'delete'
    | 'export'
    | 'etc';
  buttonName: string;
  onClick?: () => void;
}

const ButtonStyled = styled(Button)({});

const MirButton = ({
  ButtonType = 'default',
  buttonName,
  onClick,
}: MirButtonProps) => {
  if (ButtonType == 'default') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'create') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'read') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'update') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'delete') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'export') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'etc') {
    return (
      <ButtonStyled
        variant="contained"
        color="primary"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
        }}
        onClick={onClick}
      >
        {buttonName}
      </ButtonStyled>
    );
  }
};

export default MirButton;
