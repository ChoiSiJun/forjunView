import {
  SubContainer,
  BasicTable,
  InputFormControl,
  MainModal,
  LabelWithInput,
  ButtonComponent,
} from '@common_components_ui';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useRef } from 'react';

import { fetchMemberList } from '@module/member/slice/MemberListSlice';

//유저 리스트 검색 컴포넌트
function MembetList() {
  //검색어 필드 연결
  const searchInputRef = useRef<HTMLInputElement>(null);

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

          <ButtonComponent.ReadButton
            buttonName="검색"
            onClick={handleSearch}
          />
        </InputGroup>
      </SubContainer>
      <br />
      {/* 멤버 리스트 결과 컴포넌트 */}
      <SubContainer>
        <BasicTable fieldList={fieldList} dataList={memberList}></BasicTable>
      </SubContainer>

      <SubContainer>
        <ButtonComponent.CreateButton buttonName="신규" onClick={handleShow} />
      </SubContainer>
    </>
  );
}

export default MembetList;
