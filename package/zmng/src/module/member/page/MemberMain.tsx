import { Row } from 'react-bootstrap';
import { RootContainer, InsertButton } from '@common_components_ui';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import {
  alterEmail,
  alterEmaliByPayload,
} from '@module/member/slice/MemberSlice';

function MembetMain() {
  const id = useAppSelector(state => state.Member.id);
  const name = useAppSelector(state => state.Member.name);
  const email = useAppSelector(state => state.Member.email);

  const dispacth = useAppDispatch();

  return (
    <RootContainer>
      <Row>CRUD 테스트 페이지</Row>
      <h1>Profile Page</h1>
      <p> Id : {id}</p>
      <p> Name : {name}</p>
      <p> Email : {email}</p>
      <InsertButton onClick={() => dispacth(alterEmail())}>
        아이디 변경
      </InsertButton>
      <InsertButton onClick={() => dispacth(alterEmaliByPayload('test'))}>
        파라미터로 변경
      </InsertButton>
    </RootContainer>
  );
}

export default MembetMain;
