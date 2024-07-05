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
import LocationUpdateModal from '@module/system/components/LocationUpdateModal';
import { UseModal } from '@hooks/UseModal'; 
import MirModal from '@common/components/molecule/modal/MirModal';
import MirButton from '@common/components/atoms/button/MirButton';

const SystemLocationList = () => {

  // const [openModal, setopenModal] = React.useState(false);
  // const handleModalOpen = () => setopenModal(true);
  // const handleModalClose = () => setopenModal(false);
  
  const { MirModal, isOpen, openModal, closeModal } = UseModal();
  
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.LocationList);

  // 리스트 클릭 이벤트 핸들러
  const listClickHandler = (
    code: string|number,
  ) => {
    dispatch(getLocationInfo(code));
  };

  // 생성 클릭 이벤트 핸들러
  const createClickHandler = () => {
    alert('생성!!');
  };

  // 삭제 클릭 이벤트 핸들러
  const deleteClickHandler = () => {
    alert('삭제!!');
  };

  // 수정 클릭 이벤트 핸들러
  const modifyClickHandler = () => {
    alert('수정!!');
    //handleModalOpen();
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirList
          codeNameList={data.codeNameList}
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

      <MirButton ButtonType={'etc'} buttonName={'닫기'} onClick={openModal} />

      <MirModal title="추가" isOpen={isOpen} closeModal={closeModal}>
        <LocationUpdateModal />
      </MirModal>

      {/* <div>
        <MirModal
          title={'기관정보'}
          modalOpen={openModal}
          buttonList={[
            <MirButton ButtonType={'create'} buttonName={'저장'} />,
            <MirButton ButtonType={'etc'} buttonName={'닫기'} onClick={handleModalClose}/>,
          ]}
          closeModalEvent={handleModalClose}
          modalSize="md"
        >
          
        </MirModal>
      </div> */}
    </Grid>
    
  );
};

export default SystemLocationList;
