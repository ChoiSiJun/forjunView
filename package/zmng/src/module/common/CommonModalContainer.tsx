import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import MirModalContainer from '@common/components/atoms/modal/MirModalContainer';
import React from 'react';

import LocationCreateModal from '@module/system/components/location/LocationCreateModal';
import LocationUpdateModal from '@module/system/components/location/LocationUpdateModal';
import ManagerCreateModal from '@module/system/components/manager/ManagerCreateModal';
import ManagerUpdateModal from '@module/system/components/manager/ManagerUpdateModal';

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
  ManagerCreateModal: {
    Target: ManagerCreateModal,
    size: 'md',
  },
  ManagerUpdateModal: {
    Target: ManagerUpdateModal,
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
