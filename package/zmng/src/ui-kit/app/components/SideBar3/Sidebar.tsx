import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useTheme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface SidebarContextProps {
  width: string;
  collapsewidth: string;
  textColor: string;
  isCollapse: boolean;
  themeColor: string;
}

export const SidebarContext = React.createContext<SidebarContextProps>({
  width: '270px',
  collapsewidth: '80px',
  textColor: '#8D939D',
  isCollapse: false,
  themeColor: '#5d87ff',
});

interface SidebarProps {
  children?: React.ReactNode;
  width?: string;
  collapsewidth?: string;
  textColor?: string;
  isCollapse?: boolean;
  themeColor?: string;
  themeSecondaryColor?: string;
  mode?: 'light' | 'dark';
  direction?: 'ltr' | 'rtl';
  userName?: string;
  designation?: string;
  userimg?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({
    children,
    width = '260px',
    collapsewidth = '80px',
    textColor = '#2b2b2b',
    isCollapse = false,
    themeColor = '#5d87ff',
    themeSecondaryColor = '#49beff',
    mode = 'light',
    direction = 'ltr',
  }: SidebarProps) => {
    const [isSidebarHover, setIsSidebarHover] = React.useState(false);
    const toggleWidth = isCollapse && !isSidebarHover ? collapsewidth : width;
    const theme = useTheme();
    const myTheme = createTheme({
      direction: direction,
      palette: {
        mode: mode,
        primary: {
          main: themeColor,
        },
        secondary: {
          main: themeSecondaryColor,
          contrastText: '#fff',
        },
      },
    });

    if (mode === 'dark') {
      textColor = 'rgba(255,255,255, 0.9)';
    }

    return (
      <ThemeProvider theme={myTheme}>
        <Box
          dir={direction}
          sx={{
            width: toggleWidth,
            flexShrink: 0,
            fontFamily: 'inherit',
            color: textColor,
          }}
        >
          <Drawer
            anchor={direction === 'ltr' ? 'left' : 'right'}
            open
            variant="permanent"
            PaperProps={{
              sx: {
                transition: theme.transitions.create('width', {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <SimpleBar
              style={{
                height: 'calc(100vh - 50px)',
              }}
            >
              <SidebarContext.Provider
                value={{
                  textColor,
                  isCollapse,
                  width,
                  collapsewidth,
                  themeColor,
                }}
              >
                {children}
              </SidebarContext.Provider>
            </SimpleBar>
          </Drawer>
        </Box>
      </ThemeProvider>
    );
  },
);
export default Sidebar;
