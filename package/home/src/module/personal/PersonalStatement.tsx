import { Box, Grid } from '@mui/material';
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

        <Grid container justifyContent={'center'} spacing={1} marginTop={3}>
          <Grid item>
            <SjButton
              ButtonType={'update'}
              buttonName={'수정'}
              displayRule="ADMIN"
              onClick={togglePage}
            />{' '}
          </Grid>
        </Grid>
      </Box>
    );
  } else if (pageMode === 'update') {
    return (
      <Box sx={{ p: 3 }}>
        <PersonalStatementUpdate />

        <Grid container justifyContent={'center'} spacing={1} marginTop={3}>
          <Grid item>
            <SjButton ButtonType={'confirm'} buttonName={'저장'} />
          </Grid>

          <Grid item>
            <SjButton
              ButtonType={'cancle'}
              buttonName={'취소'}
              onClick={togglePage}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default PersonalStatement;
