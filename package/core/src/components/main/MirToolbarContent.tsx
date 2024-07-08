import { Box, Button, Toolbar, Typography } from '@mui/material';

export interface MirToolbarContentProps {
  title: string;
}

const MirToolbarContent = ({ title = '툴바 제목' }: MirToolbarContentProps) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', marginLeft: 'auto', gap: '5px' }}>
        <Button>테스트</Button>
      </Box>
    </Toolbar>
  );
};

export default MirToolbarContent;
