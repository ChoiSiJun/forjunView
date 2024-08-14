import Box from '@mui/material/Box';
import {
  MirLabelText,
  MirLabelTextList,
} from '@common/components/molecule/MirLabelText';
import { IManager } from '@module/system/api/InterfaceManager';

interface ManagerInfoProps {
  managerData?: IManager;
}


// interface IManagerInfo extends IManager {}

// export interface IManagerInfoProps {
//   managerInfo: IManagerInfo;
// }

const ManagerInfo = ({managerData}: ManagerInfoProps) => {
  return (
    <Box>
      <MirLabelTextList>
        <MirLabelText label="관리자 아이디">
          {managerData && managerData.userid}
        </MirLabelText>
        <MirLabelText label="이름">
          {managerData && managerData.name}
        </MirLabelText>
        <MirLabelText label="이메일">
          {managerData && managerData.email}
        </MirLabelText>
        <MirLabelText label="전화번호">
          {managerData && managerData.tel}
        </MirLabelText>
      </MirLabelTextList>
    </Box>
  );
};

export default ManagerInfo;
