import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, styled } from '@mui/material';
import { isEmpty } from 'lodash';

interface SjCheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  color?: 'secondary' | 'success' | 'default';
  onChange?: () => void;
}

const MuiCheckboxStyled = styled(Checkbox)({});

const SjCheckbox = ({
  label,
  defaultChecked = false,
  disabled = false,
  required = false,
  color,
  onChange,
}: SjCheckboxProps) => {
  if (isEmpty(label)) {
    return (
      <MuiCheckboxStyled
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        color={color}
      />
    );
  } else {
    return (
      <FormControlLabel
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        control={<MuiCheckboxStyled onChange={onChange} color={color} />}
        label={label}
      />
    );
  }
};

export default SjCheckbox;
