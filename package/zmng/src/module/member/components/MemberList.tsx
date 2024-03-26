import {
  SubContainer,
  BasicTable,
  InputFormControl,
  ButtonComponent,
} from '@common_components_ui';

import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef } from 'react';

import { fetchMemberList } from '@module/member/slice/MemberListSlice';
import { TableFieldProps, TableDataProps } from '@common_type';
import {
  MemberUpdateModal,
  MemberDelete,
} from '@module/member/slice/MemberSlice';

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

  const handleUpdate = (memberKey: string) => {
    dispatch(MemberUpdateModal(memberKey));
  };

  const handleDelete = (memberKey: string) => {
    dispatch(MemberDelete(memberKey));
  };

  //필드리스트 -> 리덕스 전역상태
  const tableFieldList = useAppSelector(
    state => state.MemberList.tableFieldList,
  );

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
        <BasicTable>
          <thead>
            <tr>
              {tableFieldList.map((tableField, index) => (
                <th key={index}>{tableField.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {memberList.map((data, index) => (
              <tr key={index}>
                {tableFieldList.map((tableField, index) => (
                  <td key={index}>{RenderTableData(tableField, data)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </BasicTable>
      </SubContainer>
    </>
  );

  function RenderTableData(tableField: TableFieldProps, data: TableDataProps) {
    console.log(tableField.type);
    if (tableField.type == 'button') {
      return (
        <>
          <ButtonComponent.UpdateButton
            buttonName="수정"
            onClick={() => {
              handleUpdate(data[tableField.key] as string);
            }}
          />

          <ButtonComponent.DeleteButton
            buttonName="삭제"
            onClick={() => {
              handleDelete(data[tableField.key] as string);
            }}
          />
        </>
      );
    }
    // buttonArray가 없는 경우 해당 키 값 반환
    return data[tableField.key];
  }
}

export default MembetList;
