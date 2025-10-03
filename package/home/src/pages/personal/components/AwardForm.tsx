// 📁 AwardForm.tsx (리팩토링)

import SjTextField from '@common/ui/elements/input/SjTextField';
import SjText from '@common/ui/elements/text/SjText';
import SjChipList from '@common/ui/modules/SjChipList';
import { PersonalAwardsParams } from '@domain/personal/Personal';
import { Paper } from '@mui/material';
import React from 'react'; // React.KeyboardEvent를 위해 import

interface AwardFormProps {
  awards: PersonalAwardsParams[];
  handleAddListItem: (value: string) => void;
  handleRemoveListItem: (idx: number) => void;
  // 💡 onKeyDown: (e: React.KeyboardEvent) => void; <-- 이 Props를 제거
}

const AwardForm = ({
  awards,
  handleAddListItem,
  handleRemoveListItem,
}: AwardFormProps) => {
  const dataList = awards.map(item => item.awardName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('test');
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const value = target.value.trim(); // 공백 제거

      if (value) {
        handleAddListItem(value); // 부모가 준 함수 호출
        target.value = ''; // 입력창 초기화
      }
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <SjText renderType="title" text={'수상내역'} />

      <SjTextField
        label={'수상 내역 추가 (Enter로 등록)'}
        onKeyDown={handleKeyDown} // 💡 내부 정의된 핸들러 사용
      />

      <SjChipList
        dataList={dataList}
        onDelete={idx => handleRemoveListItem(idx)}
      />
    </Paper>
  );
};

export default AwardForm;
