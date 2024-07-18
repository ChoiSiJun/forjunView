import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

export interface MirModalContainerProps {
  modalSize?:'sm' | 'md' | 'lg' | 'xl';
  isOpen:boolean;
  children?: React.ReactNode;
}

const MirModalContainer = ({
  modalSize,
  isOpen,
  children}:MirModalContainerProps) => {

  const StyledMirModalContainer = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  return (
    <StyledMirModalContainer 
      fullWidth
      maxWidth={modalSize}
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </StyledMirModalContainer>
  );
}

export default MirModalContainer;
