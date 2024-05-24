import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import TableContents from '@common/components/template/MirTableContents';
import MirButton from '@common/components/atoms/button/MirButton';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import { searchMemberList } from '@module/member/slice/MemberListSlice';
import { useRef } from 'react';

const MemberList = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const rows = useAppSelector(state => state.MemberList.rows);
  const columns = useAppSelector(state => state.MemberList.columns);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    try {
      //멤버정보 세팅
      await dispatch(
        searchMemberList({
          searchType: 'memberId',
          memberId: searchInputRef.current?.value || '',
          page: '0',
          size: '5',
        }),
      );
    } catch (error) {
      console.log('오류');
    }
  };

  return (
    <>
      <ModuleSettingUtill />
      <TableContents
        rows={rows}
        columns={columns}
        buttonList={[<MirButton ButtonType="default" buttonName={'신규'} />]}
        searchInputRef={searchInputRef}
        onClick={handleSearch}
      />
    </>
  );
};

export default MemberList;
