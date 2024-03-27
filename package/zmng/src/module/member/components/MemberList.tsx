import {
  SubContainer,
  BasicTable,
  InputFormControl,
  ButtonComponent,
} from '@common_components_ui';

import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef } from 'react';

import { searchMemberListThunk } from '@module/member/slice/MemberListSlice';
import { TableFieldProps, TableDataProps } from '@common_type';
import {
  searchMemberThunk,
  MemberDelete,
  openModal,
} from '@module/member/slice/MemberSlice';

//유저 리스트 검색 컴포넌트
function MembetList() {
  //검색어 필드 연결
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색 액션 핸들러 - 리덕스 디스패치
  const dispatch = useAppDispatch();
  const handleSearch = async () => {
    try {
      //멤버정보 세팅
      await dispatch(
        searchMemberListThunk({
          searchType: 'memberId',
          memberId: searchInputRef.current?.value || '',
          page: '0',
          size: '5',
        }),
      );

      //모달 오픈
      dispatch(openModal());
    } catch (error) {
      console.log('실패');
    }
  };

  const handleUpdate = (memberKey: string) => {
    dispatch(searchMemberThunk(memberKey));
  };

  const handleDelete = (memberKey: string) => {
    dispatch(MemberDelete(memberKey));
  };

  //Member FieldList -> Redux 전역
  const tableFieldList = useAppSelector(
    state => state.MemberList.memberFieldList,
  );

  //Member DataList -> Redux 전역
  const memberList = useAppSelector(state => state.MemberList.memberDataList);
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
    return data[tableField.key];
  }
}

export default MembetList;
