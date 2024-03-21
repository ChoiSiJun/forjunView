import {
  SubContainer,
  BasicTable,
  InputFormControl,
  SearchButton,
  MainModal,
  InsertButton,
  LabelWithInput,
} from '@common_components_ui';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useRef } from 'react';

import { fetchMemberList } from '@module/member/slice/MemberListSlice';
import { MemberGenerate } from '@module/member/slice/MemberSlice';

//유저 리스트 검색 컴포넌트
function MembetList() {
  //모달창 제어 핸들러
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //검색어 필드 연결
  const searchInputRef = useRef<HTMLInputElement>(null);

  //생성모달 필드
  const memberIdInputRef = useRef<HTMLInputElement>(null);
  const memberWebIdInputRef = useRef<HTMLInputElement>(null);
  const memberNameInputRef = useRef<HTMLInputElement>(null);
  const loginPasswordInputRef = useRef<HTMLInputElement>(null);

  // 검색 액션 핸들러 - 리덕스 디스패치
  const dispatch = useAppDispatch();
  const handleSearch = () => {
    dispatch(
      fetchMemberList({
        searchType: 'memberId',
        memberId: searchInputRef.current?.value || '',
        page: '0',
        size: '5',
      }),
    );
  };

  //멤버 생성 핸들러 - 리덕스 디스패치
  const handleGenerate = () => {
    dispatch(
      MemberGenerate({
        memberId: memberIdInputRef.current?.value || '',
        memberWebId: memberWebIdInputRef.current?.value || '',
        loginPassword: loginPasswordInputRef.current?.value || '',
        memberName: memberNameInputRef.current?.value || '',
      }),
    );
  };

  //필드리스트 -> 리덕스 전역상태
  const fieldList = useAppSelector(state => state.MemberList.fieldList);

  //유저검색결과 리스트 -> 리덕스 전역상태
  const memberList = useAppSelector(state => state.MemberList.responseData);
  return (
    <>
      {/* 멤버 검색창 컴포넌트 */}
      <SubContainer>
        <InputGroup className="mb-3">
          <InputFormControl
            ref={searchInputRef}
            className="form-control md-3"
            type="text"
          ></InputFormControl>
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </InputGroup>
      </SubContainer>
      <br />
      {/* 멤버 리스트 결과 컴포넌트 */}
      <SubContainer>
        <BasicTable fieldList={fieldList} dataList={memberList}></BasicTable>
      </SubContainer>

      <SubContainer>
        <InsertButton onClick={handleShow}>신규</InsertButton>
      </SubContainer>

      {/* 모달창 */}
      <MainModal
        title="멤버생성 모달"
        show={show}
        buttonList={[
          <InsertButton key="save" onClick={handleGenerate}>
            저장
          </InsertButton>,
          <InsertButton key="close" onClick={handleClose}>
            닫기
          </InsertButton>,
        ]}
        handleClose={handleClose}
      >
        <LabelWithInput
          type="text"
          label="아이디"
          labelType="row"
          ref={memberIdInputRef}
        />
        <LabelWithInput
          type="text"
          label="로그인 아이디"
          labelType="row"
          ref={memberWebIdInputRef}
        />
        <LabelWithInput
          type="text"
          label="이름"
          labelType="row"
          ref={memberNameInputRef}
        />
        <LabelWithInput
          type="password"
          label="비밀번호"
          labelType="row"
          ref={loginPasswordInputRef}
        />
      </MainModal>
    </>
  );
}

export default MembetList;
