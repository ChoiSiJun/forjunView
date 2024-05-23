import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, styled } from '@mui/material';
import { isEmpty } from 'lodash';

interface MirCheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: () => void;
}

const MuiCheckboxStyled = styled(Checkbox)({});

const MirCheckbox = ({
  label,
  defaultChecked = false,
  disabled = false,
  required = false,
  onChange,
}: MirCheckboxProps) => {
  if (isEmpty(label)) {
    return (
      <MuiCheckboxStyled
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
    );
  } else {
    return (
      <div>
        <FormControlLabel
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          control={<MuiCheckboxStyled onChange={onChange} />}
          label={label}
        />
      </div>
    );
  }
};

export default MirCheckbox;
