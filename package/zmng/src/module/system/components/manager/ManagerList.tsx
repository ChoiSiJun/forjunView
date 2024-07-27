import Grid from '@mui/material/Grid';
import MirCodeNameList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';

import { useManagerCodeNameList } from '@module/system/hook/useManagerQuery';

const ManagerList = () => {
    const { openModal } = UseModal();
  const { data: managerCodeNameList } = useManagerCodeNameList();

  const locationListItem = () => {
    openModal({
        type: 'ManagerCreateModal',
      });
  };

  const HandleListClick = () => {
    console.log('HandleListClick');
  };

  const HandleCreateClick = () => {
    console.log('HandleCreateClick');
  };

  const HandlerModifyClick = () => {
    console.log('HandlerModifyClick');
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
          {/* <SystemLocationInfo locationInfo={locationData?.data} /> */}
        </MirCard>
      </Grid>
    </Grid>
  );
};

export default ManagerList;
