import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppSelector } from 'store/ReduxHooks';

interface SjButtonProps {
  ButtonType:
    | 'default'
    | 'confirm'
    | 'cancle'
    | 'create'
    | 'read'
    | 'update'
    | 'delete'
    | 'export'
    | 'input'
    | 'etc';
  buttonName: string;
  displayRule?: string;
  onClick?: () => void;
}

const ButtonStyled = styled(Button)({});

const SjButton = ({
  ButtonType = 'default',
  buttonName,
  displayRule = 'GUEST',
  onClick,
}: SjButtonProps) => {
  const role = useAppSelector(state => state.Auth.role);
  if (displayRule != 'GUEST' && displayRule != role) {
    return null;
  }

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

  if (ButtonType == 'confirm') {
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

  if (ButtonType == 'cancle') {
    return (
      <ButtonStyled
        variant="contained"
        size="small"
        sx={{
          ml: 'auto',
          minWidth: '80px',
          margin: '30',
          backgroundColor: 'red',
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
        color="success"
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
        color="error"
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

  if (ButtonType == 'input') {
    return (
      <ButtonStyled
        variant="outlined"
        color="primary"
        onClick={onClick}
        sx={{
          minWidth: 0, // 최소 너비 제거
          padding: '6px 12px', // 버튼 내부 여백
          margin: 0, // 외부 마진 제거
          lineHeight: 1, // 버튼 높이 정렬
          boxShadow: 'none', // 그림자 제거 (필요 시)
        }}
      >
        {buttonName}
      </ButtonStyled>
    );
  }

  if (ButtonType == 'etc') {
    return (
      <ButtonStyled
        variant="outlined"
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

export default SjButton;
