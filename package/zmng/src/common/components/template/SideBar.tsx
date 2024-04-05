import { styled } from '@mui/material/styles';

import Drawer, { DrawerProps } from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ReactNode } from 'react';
import moduleInfo from '@config/module/ModuleInfo';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Drawer extends DrawerProps {
  drawerWidth: number;
  open?: boolean;
}

//사이드 메뉴 리스트 컴포넌트 정의
export const SideBarMenuList = (): ReactNode => {
  return moduleInfo.map((item, index) => (
    <Accordion disableGutters key={index}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={item.moduleName} />
      </AccordionSummary>
      <AccordionDetails>
        {item.data?.map((menuItem, menuIndex) => (
          <ListItemButton key={menuIndex} href={menuItem.menuPath}>
            <ListItemText primary={menuItem.menuName} />
          </ListItemButton>
        ))}
      </AccordionDetails>
    </Accordion>
  )) as ReactNode;
};

//사이드 메뉴 컨테이너 컴포넌트 정의
const SideBarDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open',
})<Drawer>(({ theme, open, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface LibertySideBar {
  open: boolean;
  toggleDrawer: () => void;
  drawerWidth: number;
}

//사이드 메뉴 구성
const LibertySideBar = ({
  open,
  drawerWidth,
  toggleDrawer,
}: LibertySideBar) => {
  return (
    <SideBarDrawer variant="permanent" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">{<SideBarMenuList />}</List>
    </SideBarDrawer>
  );
};

export default LibertySideBar;
