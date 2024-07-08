//import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import { getLocationList } from '@module/system/slice/LocationListSilce';
import { getLocationInfo } from '@module/system/slice/LocationSlice';
import LocationUpdateModal from '@module/system/components/LocationUpdateModal';
import LocationDeleteModal from '@module/system/components/LocationDeleteModal';
import { UseModal } from '@hooks/UseModal'; 
import MirButton from '@common/components/atoms/button/MirButton';

const SystemLocationList = () => {
  const { MirModal, isOpen, openModal, closeModal, children, modalTitle, modalSize, modalButtonList } = UseModal();  
  
  const dispatch = useAppDispatch();
  const codeNameList = useAppSelector(state => state.LocationList.codeNameList);

  // 리스트 클릭 이벤트 핸들러
  const listClickHandler = (
    code: string|number,
  ) => {
    dispatch(getLocationInfo(code));
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  // 생성 클릭 이벤트 핸들러
  const createClickHandler = () => {
    openModal(
      "sm",
      "추가입니다.", 
      <LocationDeleteModal />, 
      [
        <MirButton ButtonType={'default'} buttonName={'저장'} />,
      ]
    );
  };

  // 삭제 클릭 이벤트 핸들러
  const deleteClickHandler = () => {
    openModal(
      "lg",
      "삭제입니다.", 
      <LocationDeleteModal />, 
      [
        <MirButton ButtonType={'default'} buttonName={'삭제'} />,
      ]
    );
  };

  // 수정 클릭 이벤트 핸들러
  const modifyClickHandler = () => {
    openModal(
      "md",
      "수정입니다.", 
      <LocationUpdateModal />,
      [
        <MirButton ButtonType={'default'} buttonName={'수정'} />,
      ], 
    );
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirList
          codeNameList={codeNameList}
          onListClick={listClickHandler}
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

      <MirModal title={modalTitle} isOpen={isOpen} closeModal={closeModal} modalSize={modalSize} buttonList={modalButtonList}>
        {children}
      </MirModal>
    </Grid>
    
  );
};

export default SystemLocationList;
