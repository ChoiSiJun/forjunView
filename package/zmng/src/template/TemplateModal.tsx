import React from 'react';

import MirModal, {
  MirModalGuide,
} from '@common/components/atoms/modal/MirModal';
import MirButton from '@common/components/atoms/button/MirButton';
import { Grid } from '@mui/material';
import CardLayout from './CardLayout';

export default function TemplateModal() {
  const [openModal, setopenModal] = React.useState(false);
  const handleModalOpen = () => setopenModal(true);
  const handleModalClose = () => setopenModal(false);

  const columnsData = [
    { field: 'memberId', headerName: '아이디', width: 100 },
    { field: 'memberName', headerName: '이름', width: 130 },
  ];

  const rowsData = [
    { id: 1, memberId: 'mirtech', memberName: '미르테크' },
    { id: 2, memberId: 'slima', memberName: '슬리마' },
    { id: 3, memberId: 'guest', memberName: 'GUEST' },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} minWidth={400}>
          <CardLayout
            component={[
              {
                component: (
                  <MirButton
                    ButtonType={'etc'}
                    buttonName={'모달오픈'}
                    onClick={handleModalOpen}
                  ></MirButton>
                ),
              },
            ]}
            title={MirModalGuide.title}
            requireNote={MirModalGuide.requireNote}
            optionNote={MirModalGuide.optionNote}
            copyCode={MirModalGuide.code}
          ></CardLayout>
        </Grid>
      </Grid>

      <MirModal
        title={'테스트모달'}
        modalOpen={openModal}
        buttonList={[]}
        closeModalEvent={handleModalClose}
      ></MirModal>
    </>
  );
}
