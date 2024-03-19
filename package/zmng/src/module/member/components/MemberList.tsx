import {
  SubContainer,
  BasicTable,
  InputFormControl,
  SearchButton,
} from '@common_components_ui';
import { useAppSelector } from '@config/ReduxHooks';
import InputGroup from 'react-bootstrap/InputGroup';

//유저 리스트 검색 컴포넌트
function MembetList() {
  const fieldList = useAppSelector(state => state.MemberList.fieldList);
  const memberList = useAppSelector(state => state.MemberList.responseData);

  return (
    <>
      {/* 멤버 검색창 컴포넌트 */}
      <SubContainer>
        <InputGroup className="mb-3">
          <InputFormControl
            className="form-control md-3"
            type="text"
          ></InputFormControl>
          <SearchButton>검색</SearchButton>
        </InputGroup>
      </SubContainer>
      <br />
      {/* 멤버 리스트 결과 컴포넌트 */}
      <SubContainer>
        <BasicTable fieldList={fieldList} dataList={memberList}></BasicTable>
      </SubContainer>

      <SubContainer>
        <SearchButton>신규</SearchButton>
      </SubContainer>
    </>
  );
}

export default MembetList;
