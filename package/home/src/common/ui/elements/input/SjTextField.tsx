import { SxProps, Theme } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export interface SjTextFieldProps {
  label: string;
  name?: string;
  type?: string;
  value?: string | number;
  textFieldType?: 'outlined-basic' | 'filled-basic' | 'standard-basic';
  InputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | undefined;
  InputProps?: TextFieldProps['InputProps'];
  size?: 'small' | 'medium';
  sx?: SxProps<Theme> | undefined;
}

const SjTextField = ({
  label,
  name,
  type,
  value,
  textFieldType = 'outlined-basic',
  InputProps,
  onChange,
  onBlur,
  onKeyDown,
  error,
  size = 'small',
  sx,
  helperText,
}: SjTextFieldProps) => {
  return (
    <MuiTextField
      id={textFieldType}
      name={name}
      type={type}
      label={label}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      error={error}
      value={value}
      helperText={helperText}
      InputProps={InputProps}
      size={size}
      fullWidth
      sx={sx}
    />
  );
};

export default SjTextField;
