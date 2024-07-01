import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import MirList from '@common/components/molecule/MirCodeNameList';

import { useRef } from 'react';

const SystemLocationList = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const deleteClickHandler = () => {
    alert('삭제!!');
  };

  const modifyClickHandler = () => {
    alert('수정!!');
  };

  const rowsData = [
    { key: 1, code: 'MIRL', name: '미르테크 중앙도서관' },
    { key: 2, code: 'MSTI', name: '서초도서관' },
    { key: 3, code: 'KKDD', name: '양재도서관' },
  ];

  return (
    <>
      <ModuleSettingUtill />
      <MirList
        codeNameList={rowsData}
        onModifyClick={modifyClickHandler}
        onDeleteClick={deleteClickHandler}
      />
    </>
  );
};

export default SystemLocationList;
