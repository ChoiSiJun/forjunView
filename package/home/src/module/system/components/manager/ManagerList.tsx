import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import MirCodeNameList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';
import ManagerInfo from '@module/system/components/manager/ManagerInfo';
import UseModal from '@hooks/UseModal';
import { useManager, useManagerCodeNameList } from '@module/system/hook/useManagerQuery';

const ManagerList = () => {
  const { openModal } = UseModal();
  const [listClickItem, setListClickItem] = useState(0);

  const { data: managerCodeNameList } = useManagerCodeNameList();
  const { data: managerData } = useManager(listClickItem);

  const locationListItem = () => {
    openModal({
      type: 'ManagerCreateModal',
    });
  };

  const HandleListClick = (code: string | number) => {
    setListClickItem(code as number);
  };

  const HandleCreateClick = () => {
    openModal({
      type: 'ManagerCreateModal',
    });
  };

  const HandlerModifyClick = () => {
    // alert('HandlerModifyClick');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sx={{ bgcolor: '#EEF2F6' }}>
        <MirCodeNameList
          codeNameList={managerCodeNameList}
          onListClick={HandleListClick}
          onCreateClick={HandleCreateClick}
          onModifyClick={HandlerModifyClick}
          // onDeleteClick={HandleDeleteClick}
        />
      </Grid>
      <Grid item xs={8} sx={{ bgcolor: '#EEF2F6' }}>
        <MirCard title="기관정보">
          <ManagerInfo managerData={managerData?.data} />
        </MirCard>
      </Grid>
    </Grid>
  );
};

export default ManagerList;
