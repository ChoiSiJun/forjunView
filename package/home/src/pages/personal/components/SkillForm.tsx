// 📁 SkillForm.tsx (리팩토링)

import SjTextField from '@common/ui/elements/input/SjTextField';
import SjText from '@common/ui/elements/text/SjText';
import SjChipList from '@common/ui/modules/SjChipList';
import { PersonalSkillParams } from '@domain/personal/types';
import { Paper } from '@mui/material';
import React from 'react'; // React.KeyboardEvent를 위해 import

interface SkillFormProps {
  skills: PersonalSkillParams[];
  handleAddListItem: (value: string) => void;
  handleRemoveListItem: (idx: number) => void;
  // 💡 onKeyDown: (e: React.KeyboardEvent) => void; <-- 이 Props를 제거
}

const SkillForm = ({
  skills,
  handleAddListItem,
  handleRemoveListItem,
}: SkillFormProps) => {
  const dataList = skills.map(item => item.skillName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <SjText renderType="title" text={'기술내역'} />

      <SjTextField
        label={'기술 내역 추가'}
        onKeyDown={handleKeyDown} // 💡 내부 정의된 핸들러 사용
      />

      <SjChipList
        dataList={dataList}
        onDelete={idx => handleRemoveListItem(idx)}
      />
    </Paper>
  );
};

export default SkillForm;
