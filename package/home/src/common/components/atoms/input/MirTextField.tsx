import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export interface MirTextFieldProps {
  label: string;
  name: string;
  textFieldType?: 'outlined-basic' | 'filled-basic' | 'standard-basic';
  InputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps?: TextFieldProps['InputProps'];
}

const MirTextField = ({
  InputRef,
  label,
  name,
  textFieldType = 'outlined-basic',
  InputProps,
  onChange,
}: MirTextFieldProps) => {
  return (
    <MuiTextField
      ref={InputRef}
      id={textFieldType}
      name={name}
      label={label}
      onChange={onChange}
      InputProps={InputProps}
      size="small"
      fullWidth
    />
  );
};

export default MirTextField;
