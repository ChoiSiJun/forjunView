import Box from '@mui/material/Box';
import {
  MirLabelText,
  MirLabelTextList,
} from '@common/components/molecule/MirLabelText';

interface MirCodeNameListItem {
  // key : number;
  mloc: string;
  name_ko: string;
}

export interface LocationInfoProps {
  locationInfo: MirCodeNameListItem;
}

const SystemLocationInfo = ({ locationInfo }: LocationInfoProps) => {
  return (
    <Box>
      <MirLabelTextList>
        <MirLabelText label="기관코드">
          {locationInfo && locationInfo.mloc}
        </MirLabelText>
        <MirLabelText label="기관명칭">
          {locationInfo && locationInfo.name_ko}
        </MirLabelText>
      </MirLabelTextList>
    </Box>
  );
};

export default SystemLocationInfo;
