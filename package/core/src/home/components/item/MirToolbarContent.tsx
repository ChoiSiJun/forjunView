import { Toolbar, Typography } from '@mui/material';

import { ItemProps } from '@home/components/item/ItemProps';

export interface MirToolbarContentProps extends ItemProps {
  title: string;
}

const MirToolbarContent = ({ title = 'test' }: MirToolbarContentProps) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Toolbar>
  );
};

export default MirToolbarContent;
