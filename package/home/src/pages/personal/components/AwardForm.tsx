// 📁 AwardForm.tsx

import SjTextField from '@common/ui/elements/input/SjTextField';
import SjText from '@common/ui/elements/text/SjText';
import SjChipList from '@common/ui/modules/SjChipList';
import { Paper } from '@mui/material';
import React, { useState } from 'react';
import { usePersonal } from '@domain/personal/hooks/usePersonal';

interface AwardFormProps {
  personalHook: ReturnType<typeof usePersonal>;
}

const AwardForm = ({ personalHook }: AwardFormProps) => {
  const { awards, handleAddListItem, handleRemoveListItem } = personalHook;

  // 입력 필드의 현재 상태를 관리하기 위한 로컬 state를 추가합니다.
  // 기존의 onKeyDown 로직은 input value를 가져올 수 없으므로, useState를 사용합니다.
  const [inputValue, setInputValue] = useState('');

  // 렌더링을 위해 awardName만 추출합니다.
  const dataList = awards.map(item => item.awardName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = inputValue.trim(); // 로컬 state 값 사용

      if (value) {
        // 부모 훅에서 가져온 함수 호출
        handleAddListItem('awards', value); // 💡 'awards' 필드를 명시적으로 전달
        setInputValue(''); // 입력창 초기화
      }
    }
  };

  // SjTextField의 value와 onChange 핸들러를 관리합니다.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <SjText renderType="title" text={'수상내역'} />

      <SjTextField
        label={'수상 내역 추가 (Enter로 등록)'}
        value={inputValue} // 💡 로컬 state와 연결
        onChange={handleChange} // 💡 변경 핸들러
        onKeyDown={handleKeyDown}
      />

      <SjChipList
        dataList={dataList}
        // 💡 handleRemoveListItem 함수는 이미 필드를 인수로 받으므로,
        // idx에 'awards'를 추가하여 호출합니다.
        onDelete={idx => handleRemoveListItem('awards', idx)}
      />
    </Paper>
  );
};

export default AwardForm;
