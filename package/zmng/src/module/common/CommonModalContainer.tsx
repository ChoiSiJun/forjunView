import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';

import LocationDeleteModal from '@module/system/components/LocationDeleteModal'
import LocationCreateModal from '@module/system/components/LocationCreateModal'
import MirModalContainer from '@common/components/atoms/modal/MirModalContainer';
import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import UseModal from '@hooks/UseModal'; 

const MODAL_COMPONENTS = {
  "LocationDeleteModal": LocationDeleteModal,
  "LocationCreateModal": LocationCreateModal,
};

const ModalContainer = () => {
  const { type, isOpen, title, subTitle, size } =   useAppSelector((state) => state.Modal);
  const { closeModal } = UseModal(); 

  if (!type) {
    return null;
  }

  const Modal = MODAL_COMPONENTS[type];

  return (
      <MirModalContainer modalSize={size} isOpen={isOpen}>
        <MirModalTitle title={title} subTitle={subTitle} closeModal={() => closeModal()} />
        <Modal />
      </MirModalContainer>
  );
}

export default ModalContainer;
