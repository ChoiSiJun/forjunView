import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Grid from '@mui/material/Grid';
import MirCodeNameList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import LocationInfo from '@module/system/components/location/LocationInfo';
import UseModal from '@hooks/UseModal';
import { updateLocation } from '@module/system/slice/LocationSlice'; 

import {
  useLocationCodeNameList,
  useLocation,
} from '@module/system/hook/useLocationQuery';

const LocationList = () => {
  const { openModal } = UseModal();
  const dispatch = useAppDispatch();
  const [listClickItem, setListClickItem] = useState('');

  const {
    isLoading: locationListLoading,
    isFetching: locationListFetching,
    data: locationCodeNameList,
  } = useLocationCodeNameList();

  const {
    isLoading,
    isFetching,
    data: locationData,
    refetch: locationRefetch,
  } = useLocation(listClickItem);

  // 리스트 클릭 이벤트 핸들러
  const HandleListClick = (code: string | number) => {
    setListClickItem(code as string);
  };

  // 생성 Event Handler
  const HandleCreateClick = () => {
    openModal({
      type: 'LocationCreateModal',
    });
  };

  // 수정 Event Handler
  const HandlerModifyClick = (code: string | number) => {
    dispatch(updateLocation({code}));

    openModal({
      type: 'LocationUpdateModal',
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sx={{ bgcolor: '#EEF2F6' }}>
        <MirCodeNameList
          codeNameList={locationCodeNameList}
          onListClick={HandleListClick}
          onCreateClick={HandleCreateClick}
          onModifyClick={HandlerModifyClick}
          // onDeleteClick={HandleDeleteClick}
        />
      </Grid>
      <Grid item xs={8} sx={{ bgcolor: '#EEF2F6' }}>
        <MirCard title="기관정보">
          <LocationInfo locationInfo={locationData?.data} />
        </MirCard>
      </Grid>
    </Grid>
  );
};

export default LocationList;
