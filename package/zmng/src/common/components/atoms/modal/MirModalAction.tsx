import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

export interface MirModalActionProps {
  children?: React.ReactNode;
}

const MirModalAction = ({children}:MirModalActionProps) => {

  const MirModalActionStyle = styled(DialogActions)(({ theme }) => ({
    
  }));

  return (
    <MirModalActionStyle>
      {children}
    </MirModalActionStyle>
  );
}

export default MirModalAction;