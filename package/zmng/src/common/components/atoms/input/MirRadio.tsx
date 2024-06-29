import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export const MirRadioGuide = {
  title: '라디오버튼',
  code: `
  <MirRadio
    label={'기본'}
    defaultValue={'item1'}
    radioItem={[
        { label: 'itme1', value: 'itme1' },
        { label: 'itme2', value: 'itme2' },
        { label: 'itme3', value: 'itme3' },
    ]}
    direction="row" />`,
  requireNote: [
    'label : Radio 라벨',
    'defaultValue : 기본값',
    'radioItem : 라디오 아이템 ( name: 아이템명 , value : 아이템 값',
  ],
  optionNote: [
    'direction : 라디오 아이템 정렬방향 (row , column)',
    'onChange : radio Box 변경시 수행 함수',
  ],
};

interface MirRadioItemProps {
  label: string;
  value: string;
}

interface MirRadioProps {
  label: string;
  defaultValue: string;
  radioItem: MirRadioItemProps[];
  direction?: 'row' | 'column';
  onChange?: () => void;
}

const MirRadio = ({
  label,
  defaultValue,
  radioItem,
  direction,
  onChange,
}: MirRadioProps) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row={direction === 'row'}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={defaultValue}
        name="radio-buttons-group"
        onChange={onChange}
      >
        {radioItem.map(item => (
          <FormControlLabel
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MirRadio;
