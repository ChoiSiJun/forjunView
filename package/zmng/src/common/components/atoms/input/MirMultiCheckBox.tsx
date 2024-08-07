import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
  useWatch
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
  control: any, 
  name: string, 
  label: string, 
  options:{ value: string | number, label: string } []
}

const MirMultiCheckBox = ({
  control,
  name,
  label,
  options
}: MirMultiCheckBoxProps) => {
  const {
      field: { ref, value, onChange, ...inputProps },
      formState: { errors },
  } = useController({
      name,
      control,
      defaultValue: [],
  })

  const checkboxIds = useWatch({ control, name }) || []

  function handleChange(changeValue:any) {
    const newArray = [...checkboxIds]
    const item = changeValue

    if (newArray.length > 0) {
        const index = newArray.findIndex((x) => x === item)
        if (index === -1) {
            newArray.push(item)
        } else {
            newArray.splice(index, 1)
        }
    } else {
        newArray.push(item)
    }
    onChange(newArray)
  }

  return (
    <Box pr={1} sx={{
      maxWidth: '100%',
    }}>
      {/* <FormControl error={!!errors}> */}
      <FormControl>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.map((option: any) => {
            return (
              <StyledValidCheckBox
                control={<Checkbox />}
                label={option.label}
                key={option.value}
                inputRef={ref}
                onChange={() => handleChange(option.value)}
              />
            );
          })}
        </FormGroup>
        {/* <FormHelperText>{!!errors && errors.message}</FormHelperText> */}
      </FormControl>
    </Box>
  );
};

export default MirMultiCheckBox;
