import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';
import MirButton from '@common/components/atoms/button/MirButton';

import UseModal from '@hooks/UseModal'; 

export interface MirModalProps {
}

const deleteLocation = () => {

}

const LocationDeleteModal = () => {
  const { closeModal } = UseModal(); 

  return (
    <>
      <MirModalContents>
        삭제하시겠습니까?
      </MirModalContents>

      <MirModalAction>
      {/* <MirButton ButtonType="default" buttonName="저장" onClick={handleSubmit(deleteLocation)} /> */}
        <MirButton ButtonType="default" buttonName="닫기" onClick={() => closeModal()} />
      </MirModalAction>
    </>
  );
  
}

export default LocationDeleteModal;