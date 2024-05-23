import MainModal, {
  MainModalProps,
} from '@common/components/atoms/modal/MainModal';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { ReactNode } from 'react';

interface ModalContentProps extends MainModalProps {
  title: string;
  subTitle?: string;
  modalType?: string;
  modalSize?: number | string;
  buttonList: ReactNode[];
}

const ModalContent = ({
  title,
  subTitle,
  modalType = 'MainModal',
  modalSize = 800,
  modalOpen,
  closeModalEvent,
  children,
  buttonList,
}: ModalContentProps) => {
  if (modalType == 'MainModal') {
    return (
      <MainModal
        modalOpen={modalOpen}
        closeModalEvent={closeModalEvent}
        width={modalSize}
      >
        <Card>
          <CardHeader title={title} subheader={subTitle} />
          <CardContent>{children}</CardContent>
          <CardActions>{buttonList}</CardActions>
        </Card>
      </MainModal>
    );
  }
};

export default ModalContent;
