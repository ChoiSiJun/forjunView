import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { SidebarContext } from './Sidebar';
import CircleOutlined from '@mui/icons-material/CircleOutlined';

interface MenuItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
  badge?: boolean;
  badgeColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  badgeContent?: React.ReactNode;
  textFontSize?: string;
  borderRadius?: string;
  disabled?: boolean;
  badgeType?: 'filled' | 'outlined';
  target?: string;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      icon,
      link = '#',
      badge = false,
      badgeColor = 'secondary',
      badgeContent = '6',
      textFontSize = '14px',
      borderRadius = '8px',
      disabled = false,
      badgeType = 'filled',
    },
    ref,
  ) => {
    const customizer = React.useContext(SidebarContext);
    const theme = useTheme();
    const ListItemStyled = styled(ListItemButton)(() => ({
      whiteSpace: 'nowrap',
      marginBottom: '2px',
      padding: '10px 12px',
      textAlign: theme.direction === 'ltr' ? 'left' : 'right',
      borderRadius: borderRadius,
      color: customizer.textColor,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? '0.6' : '1',
      '.MuiListItemIcon-root': {
        color: customizer.textColor,
      },
      '&:hover': {
        backgroundColor: disabled ? '#fff' : customizer.themeColor + 20,
        color: customizer.themeColor,
        '.MuiListItemIcon-root': {
          color: customizer.themeColor,
        },
      },
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: customizer.themeColor,
        '&:hover': {
          backgroundColor: customizer.themeColor,
          color: 'white',
        },
        '.MuiListItemIcon-root': {
          color: '#fff',
        },
      },
    }));

    return (
      <Box>
        <ListItemStyled
          sx={{ display: 'flex', gap: '15px' }}
          selected={link == '/' ? true : false}
          ref={ref}
        >
          <ListItemIcon
            sx={{
              minWidth: '0px',
            }}
          >
            {icon ? icon : <CircleOutlined />}
          </ListItemIcon>
          {!customizer.isCollapse ? (
            <>
              <ListItemText sx={{ my: 0 }}>
                <Typography
                  fontSize={textFontSize}
                  sx={{ lineHeight: '1' }}
                  variant="caption"
                >
                  {children}
                </Typography>
              </ListItemText>

              {badge ? (
                <Chip
                  label={badgeContent}
                  color={badgeColor}
                  variant={badgeType}
                  size="small"
                />
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
        </ListItemStyled>
      </Box>
    );
  },
);
