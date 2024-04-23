import { Typography } from '@mui/material';
import { useAppSelector } from '@config/ReduxHooks';

const ContentTitle = () => {
  const menuName = useAppSelector(state => state.Menu.accessMenuName);

  return (
    <Typography variant="h5" fontWeight="bold">
      {menuName}
    </Typography>
  );
};

export default ContentTitle;
