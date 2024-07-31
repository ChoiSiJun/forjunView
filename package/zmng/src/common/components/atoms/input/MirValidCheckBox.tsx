import { styled } from "@mui/material";
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const StyledValidCheckBox = styled(FormControlLabel)(({ theme }) => ({
}));

interface MuiProps {
  checkBoxProps?: CheckboxProps;
}

const MirValidCheckBox = ({
  checkBoxProps,
}: MuiProps) => {

  return (
    <StyledValidCheckBox control={<Checkbox {...checkBoxProps} />} label="dfdfd" />
  );

};

export default MirValidCheckBox;