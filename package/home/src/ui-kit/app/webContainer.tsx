// WebContainer.tsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { appTheme } from '@ui-kit/app/themes/appTheme';

export default function WebContainer() {
  const { userId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'SI' | 'SM' | 'RND'>('SI');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes('/history/si')) {
      setActiveTab('SI');
    } else if (location.pathname.includes('/history/sm')) {
      setActiveTab('SM');
    } else if (location.pathname.includes('/history/rnd')) {
      setActiveTab('RND');
    }
  }, [location.pathname]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f7f8fa',
        }}
      >
        {/* 상단 메뉴 */}
        <Box
          sx={{
            height: 56,
            px: 3,
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottom: '1px solid #e0e0e0',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                setActiveTab('SI');
                navigate(`/web/${userId}/profile/history/si`);
              }}
              sx={{
                borderColor: activeTab === 'SI' ? '#1976d2' : '#ccc',
                color: activeTab === 'SI' ? '#1976d2' : '#555',
                fontWeight: 500,
                px: 2.5,
                py: 0.7,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(25,118,210,0.08)',
                  borderColor: '#1976d2',
                },
              }}
            >
              SI History
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setActiveTab('SM');
                navigate(`/web/${userId}/profile/history/sm`);
              }}
              sx={{
                borderColor: activeTab === 'SM' ? '#1976d2' : '#ccc',
                color: activeTab === 'SM' ? '#1976d2' : '#555',
                fontWeight: 500,
                px: 2.5,
                py: 0.7,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(25,118,210,0.08)',
                  borderColor: '#1976d2',
                },
              }}
            >
              SM History
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setActiveTab('RND');
                navigate(`/web/${userId}/profile/history/rnd`);
              }}
              sx={{
                borderColor: activeTab === 'RND' ? '#1976d2' : '#ccc',
                color: activeTab === 'RND' ? '#1976d2' : '#555',
                fontWeight: 500,
                px: 2.5,
                py: 0.7,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(25,118,210,0.08)',
                  borderColor: '#1976d2',
                },
              }}
            >
              RND History
            </Button>
          </Stack>
        </Box>

        {/* 내용 영역 */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
