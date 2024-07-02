//import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import MirList from '@common/components/molecule/MirCodeNameList';
import { getLocationList } from '@module/system/slice/SystemLocationSlice';

import { useEffect, useRef } from 'react';

const SystemLocationList = () => {
  
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.LocationList);

  const createClickHandler = () => {
    alert('생성!!');
  };

  const deleteClickHandler = () => {
    alert('삭제!!');
  };

  const modifyClickHandler = () => {
    alert('수정!!');
  };

  useEffect(() => {
    dispatch(getLocationList());
  }, []);


  return (
    <>
      {/* <ModuleSettingUtill /> */}
      <MirList
         codeNameList={data.codeNameList}
         onCreateClick={createClickHandler}
         onModifyClick={modifyClickHandler}
         onDeleteClick={deleteClickHandler}
      />
    </>
  );
};

export default SystemLocationList;
