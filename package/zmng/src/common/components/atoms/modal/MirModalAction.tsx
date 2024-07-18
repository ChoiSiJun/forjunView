import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

export interface MirModalActionProps {
  children?: React.ReactNode;
}

const MirModalAction = ({children}:MirModalActionProps) => {

  const StyledMirModalAction = styled(DialogActions)(({ theme }) => ({
    
  }));

  return (
    <StyledMirModalAction>
      {children}
    </StyledMirModalAction>
  );
}

export default MirModalAction;