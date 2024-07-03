//import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import { getLocationList } from '@module/system/slice/LocationListSilce';

const SystemLocationList = () => {
  
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.LocationList);

  const createClickHandler = () => {
    alert('생성!!');
  };

  const deleteClickHandler = () => {
    alert('삭제!!');
  };

  const modifyClickHandler = () => {
    alert('수정!!');
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirList
          codeNameList={data.codeNameList}
          onCreateClick={createClickHandler}
          onModifyClick={modifyClickHandler}
          onDeleteClick={deleteClickHandler}
        />
      </Grid>
      <Grid item xs={8} sx={{bgcolor:'#EEF2F6'}}>
        <MirCard 
          title="기관정보"
          component=<SystemLocationInfo/>
        />
      </Grid>
    </Grid>
  );
};

export default SystemLocationList;
