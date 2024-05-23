import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

export interface MirTextFieldProps {
  textFieldType?: 'outlined-basic' | 'filled-basic' | 'standard-basic';
  label: string;
  InputRef?: React.RefObject<HTMLInputElement>;
}

const MirTextField = ({
  InputRef,
  label,
  textFieldType = 'outlined-basic',
}: MirTextFieldProps) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField ref={InputRef} id={textFieldType} label={label} />
    </Box>
  );
};

export default MirTextField;
