import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirCodeNameList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import { getLocationInfo } from '@module/system/slice/LocationSlice';
import UseModal from '@hooks/UseModal'; 
import { useLocationList, useLocation } from '@module/system/hook/useLocationQuery'

const SystemLocationList = () => {
  const { openModal } = UseModal();  
  const dispatch = useAppDispatch();
  const [listClickItem, setListClickItem] = useState("");

  const { isLoading:locationListLoading, isFetching:locationListFetching, data:locationListItem} = useLocationList();
  const { isLoading, isFetching, data:locationData, refetch:locationRefetch } = useLocation(listClickItem);

  // 리스트 클릭 이벤트 핸들러
  const HandleListClick = (
    code: string|number,
  ) => {
    setListClickItem(code as string);
  };

  // 생성 클릭 이벤트 핸들러
  const HandleCreateClick = () => {
    openModal({
      type: "LocationCreateModal", 
      title:"기관코드 생성",
      size:"md"
    });
  };

  // 삭제 클릭 이벤트 핸들러
  const HandleDeleteClick = () => {
    openModal({
      type: "LocationDeleteModal", 
      title:"기관코드 삭제",
      size:"sm"
    });
  };

  // 수정 클릭 이벤트 핸들러
  const HandlerModifyClick = () => {
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sx={{bgcolor:'#EEF2F6'}}>
        <MirCodeNameList
          codeNameList={locationListItem}
          onListClick={HandleListClick}
          onCreateClick={HandleCreateClick}
          onModifyClick={HandlerModifyClick}
          onDeleteClick={HandleDeleteClick}
        />
      </Grid>
      <Grid item xs={8} sx={{bgcolor:'#EEF2F6'}}>
        <MirCard title="기관정보">
          <SystemLocationInfo locationInfo={locationData?.data} />
        </MirCard>
      </Grid>
    </Grid>
  );
};

export default SystemLocationList;
