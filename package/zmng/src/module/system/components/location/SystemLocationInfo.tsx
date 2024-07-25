import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

interface MirCodeNameListItem {
  // key : number;
  mloc: string;
  name_ko: string;
}

export interface LocationInfoProps {
  locationInfo: MirCodeNameListItem;
}

const SystemLocationInfo = ({
  locationInfo}:LocationInfoProps
) => {
  
  // const locationState = useAppSelector(state => state.Location);

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2}>
      <Typography variant="body3">
          기관코드: {locationInfo&&locationInfo.mloc}
        </Typography>
        <Typography variant="body3">
          기관명칭: {locationInfo&&locationInfo.name_ko}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SystemLocationInfo;

