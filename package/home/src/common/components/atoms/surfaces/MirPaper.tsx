import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

const PaperStyled = styled(Paper)(({ theme }) => ({
  overflow: 'hidden',
  flex: 1,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
  overflow: 'hidden',
  flex: 1,
  bgcolor:'#D3E4FC',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
}));

const MirPaper = ({}) => {
  return (
    <PaperStyled variant="outlined" >
      <CardHeaderStyled 
        title="123123"
        subheader="September 14, 2016"
      />
    </PaperStyled>
  );
};

export default MirPaper;