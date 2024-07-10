import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

export interface MirModalContentsProps {
  children?: React.ReactNode;
}

const MirModalContents = ({children}:MirModalContentsProps) => {

  const MirModalContentsStyle = styled(DialogContent)(({ theme }) => ({
    
  }));

  return (
    <MirModalContentsStyle dividers>
      {children}
    </MirModalContentsStyle>
  );
}

export default MirModalContents;