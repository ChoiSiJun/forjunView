// 📁 SkillForm.tsx

import SjTextField from '@common/ui/elements/input/SjTextField';
import SjText from '@common/ui/elements/text/SjText';
import SjChipList from '@common/ui/modules/SjChipList';
import { Paper } from '@mui/material';
import React, { useState } from 'react'; // 💡 useState 임포트

// 💡 usePersonal 훅 임포트 (경로는 프로젝트 구조에 맞게 조정하세요)
import { usePersonal } from '../usePersonal';

/**
 * [수정] Props가 필요 없는 독립적인 컴포넌트로 변경되었습니다.
 */
const SkillForm = () => {
  // 💡 [핵심 수정] 필요한 상태와 핸들러를 훅에서 직접 가져옵니다.
  const { skills, handleAddListItem, handleRemoveListItem } = usePersonal();

  // 입력 필드의 현재 상태를 관리하기 위한 로컬 state를 추가합니다.
  const [inputValue, setInputValue] = useState('');

  // 렌더링을 위해 skillName만 추출합니다.
  const dataList = skills.map(item => item.skillName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = inputValue.trim(); // 로컬 state 값 사용

      if (value) {
        // 부모 훅에서 가져온 함수 호출. 'skills' 필드를 명시적으로 전달합니다.
        handleAddListItem('skills', value);
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
      <SjText renderType="title" text={'기술내역'} />

      <SjTextField
        label={'기술 내역 추가 (Enter로 등록)'}
        value={inputValue} // 💡 로컬 state와 연결
        onChange={handleChange} // 💡 변경 핸들러
        onKeyDown={handleKeyDown}
      />

      <SjChipList
        dataList={dataList}
        // 💡 handleRemoveListItem 함수는 필드를 인수로 받으므로,
        // 'skills'를 추가하여 호출합니다.
        onDelete={idx => handleRemoveListItem('skills', idx)}
      />
    </Paper>
  );
};

export default SkillForm;
