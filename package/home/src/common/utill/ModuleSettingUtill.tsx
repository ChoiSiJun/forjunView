import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@config/ReduxHooks';
import { menuAccess } from '@common/slice/Menu/MenuSlice';

const ModuleSettingUtill = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  dispatch(menuAccess(location));

  return <></>;
};

export default ModuleSettingUtill;
