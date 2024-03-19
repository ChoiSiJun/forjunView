import {
  RootContainer,
  InsertButton,
  SubContainer,
} from '@common_components_ui';

import { useAppSelector } from '@config/ReduxHooks';
import BasicTable from '@common_components/Table/BasicTable';

//Member Table Data

function MembetMain() {
  const columnList = useAppSelector(state => state.MemberList.TableHeadList);
  const MemberList = useAppSelector(state => state.MemberList.ResponseData);

  return (
    <RootContainer>
      <SubContainer>
        <table></table>
        <BasicTable TableHeadList={columnList} dataList={MemberList} />
      </SubContainer>
      <SubContainer>
        <InsertButton>테스트중</InsertButton>
      </SubContainer>
    </RootContainer>
  );
}

export default MembetMain;
