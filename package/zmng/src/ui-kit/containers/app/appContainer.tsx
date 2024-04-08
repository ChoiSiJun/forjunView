import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HeaderBar from '@common/components/template/HeaderBar';
import SideBar from '@common/components/template/SideBar';
import Dashboard from '@features/dashboard/components/template/Dashboard';

import { appTheme } from '@ui-kit/themes/appTheme';

//라우터 Import
import { Route, Routes } from 'react-router-dom';

//사이드바 기본 확장 넓이
const drawerWidth: number = 240;

export default function AppContainer() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <HeaderBar
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
          title={'리버티 클라우드'}
        />

        <SideBar
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
