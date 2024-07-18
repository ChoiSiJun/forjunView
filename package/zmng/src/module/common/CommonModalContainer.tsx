import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';

import LocationDeleteModal from '@module/system/components/LocationDeleteModal';
import LocationCreateModal from '@module/system/components/LocationCreateModal';
import LocationUpdateModal from '@module/system/components/LocationUpdateModal';
import MirModalContainer from '@common/components/atoms/modal/MirModalContainer';
import React from 'react';

export interface ModalComponentProps {
  Target: React.FC
  size?:'sm' | 'md' | 'lg' | 'xl';
}

const MODAL_COMPONENTS = {
  LocationCreateModal: {
    Target: LocationCreateModal,
    size: 'md',
  },
  LocationUpdateModal: {
    Target: LocationUpdateModal,
    size: 'md',
  },
};

const ModalContainer = () => {
  const { type, isOpen } = useAppSelector(
    state => state.Modal,
  );

  if (!type) {
    return null;
  }

  const Modal:ModalComponentProps = MODAL_COMPONENTS[type];

  return (
    <MirModalContainer modalSize={Modal.size} isOpen={isOpen}>
      <Modal.Target />
    </MirModalContainer>
  );
};

export default ModalContainer;
