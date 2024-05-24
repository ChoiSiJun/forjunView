import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { ReactNode } from 'react';

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
    'modalSize : 모달창 사이즈 (기본값 : 800)',
    'buttonList : 모달창 버튼 리스트',
    'children: 내용',
  ],
};

export interface MirModalProps {
  title: string;
  subTitle?: string;
  modalType?: string;
  modalOpen: boolean;
  modalSize?: number | string;
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
  modalSize = 800,
  modalOpen,
  closeModalEvent,
  children,
  buttonList,
}: MirModalProps) => {
  //모달닫기 핸들러
  const handelCloseModal = () => {
    closeModalEvent(false);
  };

  if (modalType == 'mainModal') {
    return (
      <Modal
        open={modalOpen}
        onClose={handelCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={MirModalStyle} width={modalSize}>
          <Card>
            <CardHeader title={title} subheader={subTitle} />
            <CardContent>{children}</CardContent>
            <CardActions>{buttonList}</CardActions>
          </Card>
        </Box>
      </Modal>
    );
  }
};

export default MirModal;
