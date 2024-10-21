import * as React from 'react';
import { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Portal } from '@mui/base/Portal';
import MirButton from '@common/components/atoms/button/MirButton';
import MirModalPortal from '@common/components/atoms/modal/MirModalPortal';

import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';

import UseModal from '@hooks/UseModal'; 


export interface MirModalProps {
  title?: string;
  subTitle?: string;
  isOpen?: boolean;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  buttonList?: ReactNode[];
  children?: React.ReactNode;
}


const MirModal = ({
  title,
  subTitle,
  modalSize,
  isOpen,
  children,
  buttonList,
}: MirModalProps) => {
  const MirDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.Modal)

  const { modalElement, isModalOpen, closeModal } = UseModal();  

  console.log(modalElement)

  return (

    
    
    <MirModalPortal>
        <MirDialog
          fullWidth
          maxWidth={modalSize}
          open={modalOpen.isOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
            {title}
            {subTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ><CloseIcon/></IconButton>
          <DialogContent dividers>
            {modalElement}
            123123
          
          </DialogContent>
          {/* <DialogActions>
            {buttonList}
            <MirButton ButtonType="default" buttonName="닫기" onClick={closeModal} />
          </DialogActions> */}
        </MirDialog>
    </MirModalPortal>
  );
};

export default MirModal;
