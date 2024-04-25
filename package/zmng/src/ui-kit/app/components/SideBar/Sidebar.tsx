import { useMediaQuery, Box, Drawer, useTheme, Divider } from '@mui/material';
import SideBarHeader from '@ui-kit/app/components/SideBar/SideBarHeader';
import ItemContainer from '@ui-kit/app/components/SideBar/ItemContainer';

interface SidebarProps {
  sidebarWidth: number;
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
}

const Sidebar = ({
  sidebarWidth,
  isSidebarOpen,
  isMobileSidebarOpen,
  onSidebarClose,
}: SidebarProps) => {
  const currentTheme = useTheme(); // 현재 테마 객체 가져오기
  const lgUp = useMediaQuery(currentTheme.breakpoints.up('lg'));

  if (lgUp) {
    /* 데스크탑 사이드바 */
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: 270,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Box px={4}>
              <SideBarHeader />
            </Box>
            <br />
            <Divider />
            <Box>
              <ItemContainer />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  /* 모바일 사이드바 */
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          marginTop: '60px',
          boxShadow: theme => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <SideBarHeader />
      </Box>
      <ItemContainer />
    </Drawer>
  );
};

export default Sidebar;
