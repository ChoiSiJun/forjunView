import { Box } from '@mui/material';
import MuiTextField from '@mui/material/TextField';

export const MirTextFieldGuide = {
  title: '텍스트 필드',
  code: `const inputRef = useRef(null);
  <TextField textFieldType={'outlined-basic'} label={'텍스트필드'} InputRef={inputRef}/>`,

  requireNote: ['label: 텍스트 필드 라벨값'],
  optionNote: [
    'textFieldType: 텍스트 필드 타입 ( outlined-basic -> default ,filled-basic, standard-basic)',
    'InputRef : 텍스트 필드에 연결될 Ref값',
  ],
};

export interface MirTextFieldProps {
  label: string;
  textFieldType?: 'outlined-basic' | 'filled-basic' | 'standard-basic';
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
      <MuiTextField ref={InputRef} id={textFieldType} label={label} />
    </Box>
  );
};

export default MirTextField;
