import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Portal } from '@mui/base/Portal';

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
  //modalType?: string;
  isOpen: boolean;
  //modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  //buttonList?: ReactNode[];
  closeModal?: () => void;
  children?: React.ReactNode;
}

const MirModal = ({
  title,
  subTitle,
  //modalSize = 'md',
  isOpen,
  closeModal,
  children,
  //buttonList,
}: MirModalProps) => {
    //const [open, setOpen] = React.useState(false);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  return (
    <Portal container={() => document.getElementById('modal-root')!}>
      <React.Fragment>
        <BootstrapDialog
          fullWidth
          maxWidth='md' //{modalSize}
          open={isOpen}
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
            onClick={closeModal}
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
            {/* {buttonList} */}
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </Portal>
  );
};

export default MirModal;