import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

/** ****** 컴포넌트 가이드 ********* */
export const MirSelectBoxGuide = {
  title: '셀렉트박스',
  code: ``,
  requireNote: [
    'menuItem : SelectBox MenuItem ( name:아이템명 , value : 아이템값)',
    'defaultValue : 기본값',
    'label : label',
  ],
  optionNote: [
    'layout : 레이아웃타입 (undefined (default) , standard ,outlined ,filled)',
    'inputRef : 연결 Ref',
    'onChange : select Box 변경시 수행 함수',
  ],
};

interface MirSelectBoxMenuItem {
  name: string;
  value: string;
}

interface MirSelectBoxProps {
  menuItem: MirSelectBoxMenuItem[];
  defaultValue: string;
  label: string;
  layout?: undefined | 'standard' | 'outlined' | 'filled';
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: () => void;
}

const MirSelectBox = ({
  layout = undefined,
  menuItem,
  defaultValue,
  label,
  onChange,
  inputRef,
}: MirSelectBoxProps) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onChange?.();
  };

  return (
    <FormControl variant={layout}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId={`${label}_labelid`}
        id={`${label}_id`}
        value={value}
        label={label}
        inputRef={inputRef}
        onChange={handleChange}
      >
        {menuItem.map(item => (
          <MenuItem value={item.value}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MirSelectBox;
