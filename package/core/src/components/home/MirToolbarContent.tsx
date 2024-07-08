import { Toolbar, Typography } from '@mui/material';

export interface MirToolbarContentProps {
  title: string;
}

const MirToolbarContent = ({ title }: MirToolbarContentProps) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Toolbar>
  );
};

export default MirToolbarContent;
