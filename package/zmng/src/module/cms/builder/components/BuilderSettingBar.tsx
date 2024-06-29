import { Box, IconButton, Popover, Typography } from '@mui/material';
import Icon1 from '@mui/icons-material/Home'; // Example icons
import Icon2 from '@mui/icons-material/Settings';
import Icon3 from '@mui/icons-material/Notifications';
import Icon4 from '@mui/icons-material/Help';
import { useState } from 'react';

interface BuilderSettingBarProps {
  AppBarHeight: number;
}

const BuilderSettingBar = ({ AppBarHeight }: BuilderSettingBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverContent, setPopoverContent] = useState<React.ReactNode>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    content: React.ReactNode,
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(content);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverContent(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{
        width: 60,
        position: 'fixed',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: `${AppBarHeight}px`, // 앱바 높이만큼 상단 여백 추가
        p: 1,
      }}
    >
      <IconButton
        onClick={e => handlePopoverOpen(e, <Typography>Home Menu</Typography>)}
      >
        <Icon1 />
      </IconButton>
      <IconButton
        onClick={e =>
          handlePopoverOpen(e, <Typography>Settings Menu</Typography>)
        }
      >
        <Icon2 />
      </IconButton>
      <IconButton
        onClick={e =>
          handlePopoverOpen(e, <Typography>Notifications Menu</Typography>)
        }
      >
        <Icon3 />
      </IconButton>
      <IconButton
        onClick={e => handlePopoverOpen(e, <Typography>Help Menu</Typography>)}
      >
        <Icon4 />
      </IconButton>
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>{popoverContent}</Box>
      </Popover>
    </Box>
  );
};

export default BuilderSettingBar;
