import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export interface MirModalTitleProps {
  title: string;
  subTitle?: string;
  closeModal?: () => void;
}

const MirModalTitle = ({
  title,
  subTitle,
  closeModal,}:MirModalTitleProps) => {

  const StyledMirModalTitle = styled(DialogTitle)(({ theme }) => ({
    
  }));

  return (
    <>
    <StyledMirModalTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
      {title}
      {subTitle}
    </StyledMirModalTitle>
    <IconButton
      aria-label="close"
      onClick={closeModal}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    ><CloseIcon/></IconButton>
    </>
  );
}

export default MirModalTitle