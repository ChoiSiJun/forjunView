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
import {modalOpened, modalClosed} from '@common/slice/ModalSlice'; 

const SystemLocationList = () => {
  const { LocationCreateModal, isOpen, openModal, closeModal, modalSize } = UseModal();  
  
  const dispatch = useAppDispatch();
  const codeNameList = useAppSelector(state => state.LocationList.codeNameList);


  // 리스트 클릭 이벤트 핸들러
  const listClickHandler = (
    code: string|number,
  ) => {
    dispatch(getLocationInfo(code as string));
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  // 생성 클릭 이벤트 핸들러
  const createClickHandler = () => {
    // openModal("lg");
    dispatch(modalOpened())
  };

  // 삭제 클릭 이벤트 핸들러
  const deleteClickHandler = () => {
    alert("삭제") 
    dispatch(modalOpened())
  };

  // 수정 클릭 이벤트 핸들러
  const HandlerModifyClick = () => {
    openModal("sm");
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirList
          codeNameList={codeNameList}
          onListClick={listClickHandler}
          onCreateClick={createClickHandler}
          onModifyClick={HandlerModifyClick}
          onDeleteClick={deleteClickHandler}
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

      <LocationCreateModal title="123" isOpen={isOpen} closeModal={closeModal} modalSize="sm" />

    </Grid>
    
  );
};

export default SystemLocationList;
