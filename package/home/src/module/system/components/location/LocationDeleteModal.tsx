import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';
import MirButton from '@common/components/atoms/button/MirButton';
import MirText from '@common/components/atoms/text/MirText';

import UseModal from '@hooks/UseModal'; 
import { useAppSelector } from '@config/ReduxHooks';
// import { useDeleteLocation } from '@module/system/hook/useLocationQuery'

export interface MirModalProps {
}

const LocationDeleteModal = () => {
  const { closeModal } = UseModal(); 

  // const { mloc } = useAppSelector(
  //   state => state.Location,
  // );

  // const { mutate: deleteLocation } = useDeleteLocation();

  // const HandlLocationDelete = (deleteMloc:string) => {
  //   deleteLocation(deleteMloc);
  // };

  return (
    <>
      <MirModalTitle
        title="기관코드 삭제"
        // subTitle={Modal.subTitle}
        closeModal={() => closeModal()}
      />
      <MirModalContents>
        <MirText text="삭제하시겠습니까?" />
      </MirModalContents>

      <MirModalAction>
        {/* <MirButton ButtonType="delete" buttonName="삭제" onClick={() => HandlLocationDelete(mloc)} /> */}
        <MirButton ButtonType="etc" buttonName="닫기" onClick={() => closeModal()} />
      </MirModalAction>
    </>
  );
  
}

export default LocationDeleteModal;