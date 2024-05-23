import { FormControlLabel, Switch, styled } from '@mui/material';
import { isEmpty } from 'lodash';

interface MirSwitchProps {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  color?: 'secondary' | 'warning' | 'default';
  onChange?: () => void;
}

const SwitchStyled = styled(Switch)({});

const MirSwitch = ({
  label,
  defaultChecked = false,
  disabled = false,
  required = false,
  color,
  onChange,
}: MirSwitchProps) => {
  if (isEmpty(label)) {
    return (
      <SwitchStyled
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
        label={label}
        control={
          <SwitchStyled
            defaultChecked={defaultChecked}
            disabled={disabled}
            required={required}
            onChange={onChange}
            color={color}
          />
        }
      />
    );
  }
};

export default MirSwitch;
