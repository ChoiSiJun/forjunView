import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import { getLocationList } from '@module/system/slice/LocationListSilce';
import { getLocationInfo } from '@module/system/slice/LocationSlice';
import UseModal from '@hooks/UseModal'; 
import LocationCreateModal from '@module/system/components/LocationCreateModal'
import MirModal from '@common/components/molecule/MirModal';

const SystemLocationList = () => {
  const { openModal } = UseModal();  
  
  const dispatch = useAppDispatch();
  const codeNameList = useAppSelector(state => state.LocationList.codeNameList);

  // 리스트 클릭 이벤트 핸들러
  const HandleListClick = (
    code: string|number,
  ) => {
    dispatch(getLocationInfo(code as string));
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  // 생성 클릭 이벤트 핸들러
  const HandleCreateClick = () => {
    // openModal("lg");
    // dispatch(modalOpened())
    openModal();
  };

  // 삭제 클릭 이벤트 핸들러
  const HandleDeleteClick = () => {
    // <SystemLocationInfo />, {"sm"}
    openModal();
  };

  // 수정 클릭 이벤트 핸들러
  const HandlerModifyClick = () => {
    // openModal("sm");
    // openModal();
    openModal();
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirList
          codeNameList={codeNameList}
          onListClick={HandleListClick}
          onCreateClick={HandleCreateClick}
          onModifyClick={HandlerModifyClick}
          onDeleteClick={HandleDeleteClick}
        />
      </Grid>
      <Grid item xs={8} sx={{bgcolor:'#EEF2F6'}}>
        <MirCard title="기관정보">
          <SystemLocationInfo/>
        </MirCard>
      </Grid>

      {/* <MirModal title={modalTitle} isOpen={isOpen} closeModal={closeModal} modalSize={modalSize}>
        <LocationUpdateModal />
      </MirModal> */}

      <LocationCreateModal title="기관 생성"/>



    </Grid>

    
    
  );
};

export default SystemLocationList;
