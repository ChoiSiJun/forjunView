import { Box, Typography } from '@mui/material';

interface BuilderSideBarProps {
  width: number;
}

const BuilderSidebar = ({ width }: BuilderSideBarProps) => {
  return (
    <Box sx={{ width: { width }, p: 2 }}>
      <Typography variant="h6">Sidebar Content</Typography>
      {/* 사이드바에 원하는 콘텐츠를 추가하세요 */}
    </Box>
  );
};

export default BuilderSidebar;
