import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { ReactNode } from 'react';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MirCard from '@common/components/molecule/MirCard';
import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

export const MirModalGuide = {
  title: '기본모달',
  code: ` 

  <MirButton
  ButtonType={'etc'}
  buttonName={'모달오픈'}
  onClick={handleModalOpen} />

  <MirModal
  title={'테스트모달'}
  modalOpen={openModal}
  buttonList={[]}
  closeModalEvent={handleModalClose}>
  </MirModal>
  
  `,
  requireNote: [
    'title : 모달창 제목',
    'modalOpen : 모달상태값',
    'closeModalEvent : 모달닫기이벤트',
  ],
  optionNote: [
    'subTitle: 모달창 부제목',
    'modalType : 모달호출타입 (기본값 : mainModal)',
    'modalSize : 모달창 사이즈(sm,md,lg,xl) (기본값 : md)',
    'buttonList : 모달창 버튼 리스트',
    'children: 내용',
  ],
};

export interface MirModalProps {
  title: string;
  subTitle?: string;
  modalType?: string;
  modalOpen: boolean;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  buttonList?: ReactNode[];
  closeModalEvent: (modal: boolean) => void;
  children?: React.ReactNode;
}

const MirModal = ({
  title,
  subTitle,
  modalType = 'mainModal',
  modalSize = 'md',
  modalOpen,
  closeModalEvent,
  children,
  buttonList,
}: MirModalProps) => {
    //const [open, setOpen] = React.useState(false);

    //모달닫기 핸들러
    const handelCloseModal = () => {
      closeModalEvent(false);
    };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  if (modalType == 'mainModal') {
    return (
      <React.Fragment>
        <BootstrapDialog
          fullWidth
          maxWidth={modalSize}
          open={modalOpen}
          //onClose={handelCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
            {title}
            {subTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handelCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ><CloseIcon/></IconButton>
          <DialogContent dividers>
            {children}
          </DialogContent>
          <DialogActions>
            {buttonList}
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
};

export default MirModal;
