import { useState, ReactNode } from 'react';
import React from 'react';
import MirModal from '@common/components/molecule/MirModal';

export const UseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (
    size:string,
    title:string,
    children:React.ReactNode,
    buttonList?: React.ReactNode[],
  ) => { 
    setModalSize(size)
    setModalTitle(title);
    setChildren(children);
    setModalButtonList(buttonList);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const [modalSize, setModalSize] = useState("sm");
  const [modalTitle, setModalTitle] = useState("제목입니다.");
  const [children, setChildren] = useState(React.ReactNode);
  const [modalButtonList, setModalButtonList] = useState(React.ReactNode);

  return {
    MirModal,
    isOpen,
    openModal,
    closeModal,
    modalSize,
    modalTitle,
    children,
    modalButtonList,
  };
};