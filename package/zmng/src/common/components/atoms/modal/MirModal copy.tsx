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
    'modalSize : 모달창 사이즈(s,m,l,f) (기본값 : m)',
    'buttonList : 모달창 버튼 리스트',
    'children: 내용',
  ],
};

export interface MirModalProps {
  title: string;
  subTitle?: string;
  modalType?: string;
  modalOpen: boolean;
  modalSize?: 's' | 'm' | 'l' | 'f';
  buttonList?: ReactNode[];
  closeModalEvent: (modal: boolean) => void;
  children?: React.ReactNode;
}

const MirModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
};

const MirModal = ({
  title,
  subTitle,
  modalType = 'mainModal',
  modalSize = 'm',
  modalOpen,
  closeModalEvent,
  children,
  buttonList,
}: MirModalProps) => {
  //모달닫기 핸들러
  const handelCloseModal = () => {
    closeModalEvent(false);
  };

  let modalWidth = '0%';
  let modalHeight = '0%';

  if (modalSize == 's') {
    modalWidth = '25%';
    modalHeight = '25%';
  }

  if (modalSize == 'm') {
    modalWidth = '50%';
    modalHeight = '50%';
  }

  if (modalSize == 'l') {
    modalWidth = '75%';
    modalHeight = '75%';
  }

  if (modalSize == 'f') {
    modalWidth = '100%';
    modalHeight = '100%';
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (modalType == 'mainModal') {
    return (
      <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent dividers>
          <MirCard 
            title="기관정보"
            component=<SystemLocationInfo/>
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      // <Modal
      //   open={modalOpen}
      //   onClose={handelCloseModal}
      //   aria-labelledby="parent-modal-title"
      //   aria-describedby="parent-modal-description"
      // >
      //   <Box sx={MirModalStyle} width={modalWidth} height={modalHeight}>
      //     <Card
      //       sx={{
      //         minWidth: 300,
      //         minHeight: 400,
      //         width: '100%',
      //         height: '100%',
      //         display: 'flex',
      //         flexDirection: 'column',
      //       }}
      //     >
      //       <CardHeader title={title} subheader={subTitle} />
      //       <CardContent sx={{ flex: 1, overflow: 'auto' }}>
      //         {children}
      //       </CardContent>
      //       <CardActions>{buttonList}</CardActions>
      //     </Card>
      //   </Box>
      // </Modal>
    );
  }
};

export default MirModal;
