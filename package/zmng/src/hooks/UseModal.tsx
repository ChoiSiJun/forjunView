import { useState, ReactNode } from 'react';
import React from 'react';
import MirModal from '@common/components/molecule/MirModal';
import LocationCreateModal from '@module/system/components/LocationCreateModal';

export const UseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [modalSize, setModalSize] = useState("sm");
  const [modalTitle, setModalTitle] = useState("제목입니다.");
  const [contents, setContents] = useState(React.ReactNode);
  const [modalButtonList, setModalButtonList] = useState(React.ReactNode);


  const openModal = (
    size:'sm' | 'md' | 'lg' | 'xl',
    // title:string,
    // contents:React.ReactNode,
    // buttonList?: React.ReactNode,
  ) => { 

    setModalSize(size)
    // setModalTitle(title);
    // setContents(contents);
    // setModalButtonList(buttonList);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);


  return {
    LocationCreateModal,
    MirModal,
    isOpen,
    openModal,
    closeModal,
    modalSize,
    modalTitle,
    contents,
    modalButtonList,
  };
};