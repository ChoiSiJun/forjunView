import { useEffect, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HeaderBar from '@common/components/template/HeaderBar';
import SideBar from '@common/components/template/SideBar';
import Dashboard from '@features/dashboard/components/template/Dashboard';
import MemberMain from '@module/member/page/MemberMain';

import { appTheme } from '@ui-kit/themes/appTheme';
import Container from '@mui/material/Container';

//라우터 Import
import { Route, Routes, useLocation } from 'react-router-dom';

//사이드바 기본 확장 넓이
const drawerWidth: number = 240;

export default function AppContainer() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  const [open, setOpen] = useState(true);
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
          title={'Liberty Cloud'}
        />

        <SideBar
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? 'white'
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/member" element={<MemberMain />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
