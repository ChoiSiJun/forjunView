import { Box, Toolbar } from '@mui/material';
import ContentTitle from '@common/components/atoms/text/ContentTitle';
import { ReactNode } from 'react';

export interface ToolbarContentProps {
  buttonList: ReactNode[];
}

const ToolbarContent = ({ buttonList }: ToolbarContentProps) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ContentTitle />
      <Box sx={{ display: 'flex', marginLeft: 'auto', gap: '5px' }}>
        {buttonList}
      </Box>
    </Toolbar>
  );
};

export default ToolbarContent;
