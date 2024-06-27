import React, { useState } from 'react';
import { CssBaseline, Box, IconButton, Drawer } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas from './BuilderCanvas';
import BuilderSidebar from './BuilderSideBar';

import BuilderSettingBar from './BuilderSettingBar';
import BuilderAppBar from './BuilderAppBar';

const SidebarWidth = 240;
const AppBarHeight = 64;

const BuilderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />

      <BuilderAppBar />

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
          marginRight: !isSidebarOpen ? `-240px` : 0,
          marginTop: `${AppBarHeight}px`, // 앱바 높이만큼 상단 여백 추가
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleSideBar}
          edge="end"
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
        <BuilderCanvas />
      </Box>
      <Drawer
        variant="persistent"
        anchor="right"
        open={isSidebarOpen}
        sx={{
          width: SidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SidebarWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <BuilderSidebar width={SidebarWidth} />
      </Drawer>
    </Box>
  );
};

export default BuilderLayout;
