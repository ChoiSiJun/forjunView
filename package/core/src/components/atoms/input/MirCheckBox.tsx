import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, styled } from '@mui/material';
import { isEmpty } from 'lodash';

export const MirCheckBoxGuide = {
  title: '체크박스',
  code: `<MirCheckbox label="라벨값" />`,
  requireNote: [],
  optionNote: [
    'label: 체크박스 라벨',
    'required : 라벨사용시 -> 필수값 체크 표시',
    'defaultChecked : 기본값 체크',
    'disabled : 체크박스 비활성화',
    'color: 체크박스 컬러 ( secondary , success , default)',
  ],
};

interface MirCheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  color?: 'secondary' | 'success' | 'default';
  onChange?: () => void;
}

const MuiCheckboxStyled = styled(Checkbox)({});

const MirCheckbox = ({
  label,
  defaultChecked = false,
  disabled = false,
  required = false,
  color,
  onChange,
}: MirCheckboxProps) => {
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
  }
  return (
    <FormControlLabel
      defaultChecked={defaultChecked}
      disabled={disabled}
      required={required}
      control={<MuiCheckboxStyled onChange={onChange} color={color} />}
      label={label}
    />
  );
};

export default MirCheckbox;
