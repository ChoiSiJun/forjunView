//import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import { useEffect, useRef } from 'react';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import { getLocationList } from '@module/system/slice/LocationListSilce';
import { getLocationInfo } from '@module/system/slice/LocationSlice';

import MirModal from '@common/components/atoms/modal/MirModal';
import MirButton from '@common/components/atoms/button/MirButton';

const SystemLocationList = () => {

  const [openModal, setopenModal] = React.useState(false);
  const handleModalOpen = () => setopenModal(true);
  const handleModalClose = () => setopenModal(false);
  
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

  const listSelectHandler = () => {
    dispatch(getLocationInfo("MIRL"));
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirList
          codeNameList={data.codeNameList}
          onSelect={listSelectHandler}
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

        <MirButton
          ButtonType={'etc'}
          buttonName={'모달'}
          onClick={handleModalOpen}
        ></MirButton>
      </Grid>

      <div>
        <MirModal
        title={'테스트모달'}
        modalOpen={openModal}
        buttonList={[]}
        closeModalEvent={handleModalClose}
        ></MirModal>
      </div>
    </Grid>
    
  );
};

export default SystemLocationList;
