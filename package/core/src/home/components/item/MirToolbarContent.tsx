import { Toolbar, Typography } from '@mui/material';

import { ItemState } from '@home/components/item/ItemState';

export interface MirToolbarContentProps extends ItemState {}

const MirToolbarContent = ({
  renderType,
  ComponentProps = {},
}: MirToolbarContentProps) => {
  const { title } = ComponentProps;

  if (renderType === 'preview') {
    return <div>Toolbar</div>;
  }

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Toolbar>
  );
};

export default MirToolbarContent;
