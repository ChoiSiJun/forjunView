import { useState } from 'react';
import MirModal from '@common/components/molecule/modal/MirModal';

export const UseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    MirModal,
    isOpen,
    openModal,
    closeModal,
  };
};