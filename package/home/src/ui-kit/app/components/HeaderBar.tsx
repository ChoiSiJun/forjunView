import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

//Mui AppBar Type
interface AppBarProps extends MuiAppBarProps {
  headerBarHeight: number;
  sidebarWidth: number;
  open?: boolean;
}

//Mui AppBar 스타일 정의 컴포넌트
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'sidebarWidth',
})<AppBarProps>(({ theme, open, sidebarWidth, headerBarHeight }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`,
    height: headerBarHeight,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Liberty HeaderBar Type
interface HeaderBarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  headerBarHeight: number;
  sidebarWidth: number;
  title: string;
}

//Liberty HeaderBar 컴포넌트
const HeaderBar = ({
  title,
  headerBarHeight,
  sidebarWidth,
  setSidebarOpen,
  isSidebarOpen,
}: HeaderBarProps) => {
  const currentTheme = useTheme(); // 현재 테마 객체 가져오기
  const lgUp = useMediaQuery(currentTheme.breakpoints.up('lg'));

  const HandleMobileSideOpen = () => {
    if (isSidebarOpen == false) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  };

  return (
    <AppBar
      position="absolute"
      open={isSidebarOpen}
      sidebarWidth={lgUp ? sidebarWidth : 0}
      headerBarHeight={headerBarHeight}
    >
      <Toolbar
        sx={{
          minHeight: `${headerBarHeight}px`, // Toolbar 높이 설정
          height: `${headerBarHeight}px`, // Toolbar 높이 설정
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: '24px', // keep right padding when drawer closed
          pl: '24px', // left padding 추가
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={HandleMobileSideOpen}
          sx={{
            marginRight: '36px',
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
