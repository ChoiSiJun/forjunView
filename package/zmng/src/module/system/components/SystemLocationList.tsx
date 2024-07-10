import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import { getLocationList } from '@module/system/slice/LocationListSilce';
import { getLocationInfo } from '@module/system/slice/LocationSlice';
import LocationCreateModal from '@module/system/components/LocationCreateModal';
import LocationUpdateModal from '@module/system/components/LocationUpdateModal';
import LocationDeleteModal from '@module/system/components/LocationDeleteModal';
import { UseModal } from '@hooks/UseModal'; 
import MirButton from '@common/components/atoms/button/MirButton';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MirModal from '@common/components/molecule/MirModal';

export interface FormValues {
  "mloc": string;
  "name_ko": string;
};


const SystemLocationList = () => {
  const { LocationCreateModal, isOpen, openModal, closeModal, modalTitle, modalSize } = UseModal();  
  
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
    openModal("lg");
  };

  // 삭제 클릭 이벤트 핸들러
  const deleteClickHandler = () => {
    // openModal(
    //   "lg",
    //   "삭제입니다.", 
    //   <LocationDeleteModal />, 
    // );
  };

  // 수정 클릭 이벤트 핸들러
  const modifyClickHandler = () => {
    openModal("sm");
    // openModal(
    //   "md",
    //   "수정입니다.", 
    //   <LocationUpdateModal />,
    // );
  };

  const { handleSubmit, control } = useForm<FormValues> ({
    defaultValues: {
      mloc: "",
      name_ko: "",
    }
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data));
   closeModal();
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

      <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MirValidTextField 
                name="mloc"
                control={control}
                rules={{ required: "기관코드를 입력하세요." }}
                textFieldProps={{
                  label: "기관코드",
                  id: "mloc",
                  placeholder: "기관코드를 입력하세요." 
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <MirValidTextField 
                name="name_ko"
                control={control}
                rules={{ required: "기관명칭을 입력하세요." }}
                textFieldProps={{
                  label: "기관명칭",
                  id: "name_ko",
                  placeholder: "기관명칭을 입력하세요." 
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <input type="submit" />
          </Grid>
        </form>
      </Grid>

      <MirModal title={modalTitle} isOpen={isOpen} closeModal={closeModal} modalSize={modalSize}>
        <LocationUpdateModal />
      </MirModal>

      {/* <LocationCreateModal title={modalTitle} isOpen={isOpen} closeModal={closeModal} modalSize={modalSize} /> */}

    </Grid>
    
  );
};

export default SystemLocationList;
