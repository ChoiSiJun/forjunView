import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
import {
  styled,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel"
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const StyledValidCheckBox = styled(FormControlLabel)(({ theme }) => ({}));

interface MirMultiCheckBoxProps {
  label:string;
  required:boolean;
}

const options = [
  {
    label: 'Checkbox Option 1',
    value: '1',
  },
  {
    label: 'Checkbox Option 2',
    value: '2',
  },
];

const MirMultiCheckBox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  required,
  ...props
}: MirMultiCheckBoxProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <Box pr={1} sx={{
      maxWidth: '100%',
    }}>
      <FormControl error={!!error} required={required}>
        {/* <InputLabel error={!!error}>{required && '* '}{label}</InputLabel> */}
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.map((option: any) => {
            return (
              <StyledValidCheckBox
                control={<Checkbox />}
                label={option.label}
                key={option.value}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{!!error && error.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default MirMultiCheckBox;
