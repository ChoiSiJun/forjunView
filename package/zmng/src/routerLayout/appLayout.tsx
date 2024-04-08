import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HeaderBar from '@common/components/template/HeaderBar';
import SideBar from '@common/components/template/SideBar';
import LibertyDashboard from '@features/dashboard/components/template/Dashboard';
import { green, blue } from '@mui/material/colors';

//라우터 Import
import { Route } from 'react-router-dom';

//사이드바 기본 확장 넓이
const drawerWidth: number = 240;

// TODO remove, this demo shouldn't need to reset the theme.
//테마 지정
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: green[500],
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    fontSize: 16, // 글꼴 크기
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function AppLayout() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
        <Route path="/dashboard" element={<LibertyDashboard />}></Route>
      </Box>
    </ThemeProvider>
  );
}
