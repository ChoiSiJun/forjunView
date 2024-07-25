import Grid from '@mui/material/Grid';
import MirCodeNameList from '@common/components/molecule/MirCodeNameList';
import MirCard from '@common/components/molecule/MirCard';

import {
    useManagerList,
  } from '@module/system/hook/useManagerQuery';

const SystemManagerList = () => {

    const {
        data: managerListItem,
      } = useManagerList();

    const locationListItem = () => {
        console.log("locationListItem");
    };

    const HandleListClick = () => {
        console.log("HandleListClick");
    };

    const HandleCreateClick = () => {
        console.log("HandleCreateClick");
    };

    const HandlerModifyClick = () => {
        console.log("HandlerModifyClick");
    };

    return (
       <Grid container spacing={2}>
            <Grid item xs={4} sx={{ bgcolor: '#EEF2F6' }}>
                <MirCodeNameList
                    codeNameList={managerListItem}
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
}

export default SystemManagerList;