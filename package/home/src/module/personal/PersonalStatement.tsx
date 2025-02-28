import { Box } from '@mui/material';
import { useState } from 'react';
import PersonalStatementDisplay from '@module/personal/subpage/PersonalStatementDisplay';
import PersonalStatementUpdate from '@module/personal/subpage/PersonalStatementUpdate';
import SjButton from '@common/components/atoms/button/SjButton';

const PersonalStatement = () => {
  const [pageMode, setPageMode] = useState<'display' | 'update'>('display');
  const togglePage = () => {
    setPageMode(prevMode => (prevMode === 'display' ? 'update' : 'display'));
  };

  if (pageMode === 'display') {
    return (
      <Box sx={{ p: 3 }}>
        <PersonalStatementDisplay />

        {/* 변경버튼*/}
        <SjButton
          ButtonType={'update'}
          buttonName={'변경'}
          displayRule="ADMIN"
          onClick={togglePage}
        />
      </Box>
    );
  } else if (pageMode === 'update') {
    return (
      <Box sx={{ p: 3 }}>
        <PersonalStatementUpdate />
      </Box>
    );
  }
};

export default PersonalStatement;
