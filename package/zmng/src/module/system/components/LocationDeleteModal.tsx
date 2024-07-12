
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import { modalClosed } from '@common/slice/ModalSlice';

import MirModalContainer from '@common/components/atoms/modal/MirModalContainer';
import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';

import UseModal from '@hooks/UseModal'; 

export interface MirModalProps {
  title?: string;
  subTitle?: string;
  // modalSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const LocationDeleteModal = ({
  title,
  subTitle,
  // modalSize,
}:MirModalProps) => {

  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.Modal)

  return (
    <MirModalContainer modalSize="sm" isOpen={modalOpen.isOpen}>
      <MirModalTitle title="삭제" subTitle={subTitle} closeModal={() => dispatch(modalClosed())} />

      <MirModalContents>
        삭제합니다.
      </MirModalContents>
      
    </MirModalContainer>
     
  );
  
}

export default LocationDeleteModal;