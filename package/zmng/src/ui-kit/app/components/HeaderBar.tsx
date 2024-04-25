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
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerBarHeight: number;
  sidebarWidth: number;
  title: string;
}

//Liberty HeaderBar 컴포넌트
const HeaderBar = ({
  title,
  headerBarHeight,
  sidebarWidth,
  setMobileSidebarOpen,
}: HeaderBarProps) => {
  const currentTheme = useTheme(); // 현재 테마 객체 가져오기
  const lgUp = useMediaQuery(currentTheme.breakpoints.up('lg'));

  const HandleMobileSideOpen = () => {
    setMobileSidebarOpen(true);
  };

  return (
    <AppBar
      position="absolute"
      open={lgUp ? true : false}
      sidebarWidth={lgUp ? sidebarWidth : 0}
      headerBarHeight={headerBarHeight}
    >
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={HandleMobileSideOpen}
          sx={{
            marginRight: '36px',
            display: lgUp ? 'none' : 'block',
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
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
