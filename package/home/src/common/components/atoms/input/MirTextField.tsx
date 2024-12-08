import { SxProps, Theme } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export interface MirTextFieldProps {
  label: string;
  name: string;
  type?: string;
  textFieldType?: 'outlined-basic' | 'filled-basic' | 'standard-basic';
  InputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | undefined;
  InputProps?: TextFieldProps['InputProps'];
  size?: 'small' | 'medium';
  sx?: SxProps<Theme> | undefined;
}

const MirTextField = ({
  InputRef,
  label,
  name,
  type,
  textFieldType = 'outlined-basic',
  InputProps,
  onChange,
  onBlur,
  error,
  size,
  sx,
  helperText,
}: MirTextFieldProps) => {
  return (
    <MuiTextField
      ref={InputRef}
      id={textFieldType}
      name={name}
      type={type}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={InputProps}
      size={(size = 'small')}
      fullWidth
      sx={sx}
    />
  );
};

export default MirTextField;
