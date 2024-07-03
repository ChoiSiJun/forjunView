import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const SystemLocationInfo = () => {
  
  const locationState = useAppSelector(state => state.Location);

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2}>
       <Typography variant="body3">
          기관코드: {locationState.locationInfo.mloc}
        </Typography>
        <Typography variant="body3">
          기관명칭: {locationState.locationInfo.name_ko}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SystemLocationInfo;

