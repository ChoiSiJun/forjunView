import { TextFieldProps } from '@mui/material'
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel"
import FormControl from '@mui/material/FormControl';

interface MuiProps {
  textFieldProps?: TextFieldProps;
}

const StyledValidTextField = styled(TextField)(({ theme }) => ({
}));

const StyledValidInputLabel = styled(InputLabel)(({ theme }) => ({
}));

const MirValidTextField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >({
  textFieldProps, // textField를 위한 prop들, mui에서 import 해온다.
  ...props
  }: MuiProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <Box pr={1} sx={{
      maxWidth: '100%',
    }}>
      {/* <StyledValidInputLabel shrink error={!!error} required={textFieldProps?.required} >{textFieldProps?.label}</StyledValidInputLabel> */}
        {/* <StyledValidTextField
          {...textFieldProps}
          {...field}
          size="small"
          variant="outlined"
          error={!!error}
          helperText={!!error && error.message}
          label=""
          fullWidth
        /> */}
      <StyledValidTextField
          {...textFieldProps}
          {...field}
          required={textFieldProps?.required}
          size="small"
          variant="outlined"
          error={!!error}
          helperText={!!error && error.message}
          label={textFieldProps?.label}
          fullWidth
        />
    </Box>
  );
};

export default MirValidTextField;