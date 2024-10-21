
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface MirTextProps {
  text: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
}));

const MirInputText = ({text}:MirTextProps) => {
  return (
    <StyledTypography>
      {text}
    </StyledTypography>
  );
}

export default MirInputText;