import React, { useState } from 'react';
import { CssBaseline, Box, IconButton, Drawer } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas from './BuilderCanvas';
import BuilderSidebar from './BuilderSideBar';

import BuilderSettingBar from './BuilderSettingBar';

const SidebarWidth = 340;
const AppBarHeight = 64;

const BuilderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />

      <BuilderSettingBar AppBarHeight={AppBarHeight} />

      <Box
        component="main"
        sx={{
          transition: theme =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          width: isSidebarOpen ? `calc(100% - ${SidebarWidth}px)` : '100%',
          marginRight: !isSidebarOpen ? `-${SidebarWidth - 40}px` : 0,
          marginLeft: '80px',
          marginTop: `${AppBarHeight}px`, // 앱바 높이만큼 상단 여백 추가
        }}
      >
        <BuilderCanvas />
      </Box>

      <IconButton //우측 콘텐츠바 버튼
        color="inherit"
        aria-label="open drawer"
        onClick={handleSideBar}
        edge="end"
        sx={{
          position: 'fixed',
          top: 100,
          right: 36,
          zIndex: 1300,
          display: isSidebarOpen ? 'none' : 'block',
        }}
      >
        <AddCircleRoundedIcon fontSize="large" />
      </IconButton>

      <Drawer
        variant="persistent"
        anchor="right"
        open={isSidebarOpen}
        sx={{
          width: SidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SidebarWidth,
            top: `${AppBarHeight + 10}px`,
            boxSizing: 'border-box',
          },
        }}
      >
        <BuilderSidebar />
      </Drawer>
    </Box>
  );
};

export default BuilderLayout;
