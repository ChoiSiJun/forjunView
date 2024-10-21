import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

export interface MirModalContentsProps {
  children?: React.ReactNode;
}

const MirModalContents = ({children}:MirModalContentsProps) => {

  const StyledMirModalContents = styled(DialogContent)(({ theme }) => ({
    
  }));

  return (
    <StyledMirModalContents dividers>
      {children}
    </StyledMirModalContents>
  );
}

export default MirModalContents;