import React from 'react';

// import MirModal, {
//   MirModalGuide,
// } from '@common/components/atoms/modal/MirModal';
// import MirButton from '@common/components/atoms/button/MirButton';
// import { Grid } from '@mui/material';
// import CardLayout from './CardLayout';
// import MirDataTable from '@common/components/atoms/table/MirDataTable';

export default function TemplateModal() {
  // const [openModal, setopenModal] = React.useState(false);
  // const handleModalOpen = () => setopenModal(true);
  // const handleModalClose = () => setopenModal(false);

  // const [openModal2, setopenModal2] = React.useState(false);
  // const handleModalOpen2 = () => setopenModal2(true);
  // const handleModalClose2 = () => setopenModal2(false);

  // const columnsData = [
  //   { field: 'memberId', headerName: '아이디', width: 100 },
  //   { field: 'memberName', headerName: '이름', width: 130 },
  // ];

  // const rowsData = [
  //   { id: 1, memberId: 'mirtech', memberName: '미르테크' },
  //   { id: 2, memberId: 'slima', memberName: '슬리마' },
  //   { id: 3, memberId: 'guest', memberName: 'GUEST' },
  // ];

  return (
    <>
      {/* <Grid container spacing={3}>
        <Grid item xs={6} minWidth={400}>
          <CardLayout
            component={[
              {
                component: (
                  <MirButton
                    ButtonType={'etc'}
                    buttonName={'모달'}
                    onClick={handleModalOpen}
                  ></MirButton>
                ),
              },
              {
                component: (
                  <MirButton
                    ButtonType={'etc'}
                    buttonName={'모달(테이블 + 버튼)'}
                    onClick={handleModalOpen2}
                  />
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

      <MirModal
        title={'내용 + 버튼'}
        modalOpen={openModal2}
        buttonList={[
          <MirButton ButtonType={'default'} buttonName={'버튼1'} />,
          <MirButton ButtonType={'default'} buttonName={'버튼2'} />,
          <MirButton ButtonType={'default'} buttonName={'버튼3'} />,
        ]}
        closeModalEvent={handleModalClose2}
      >
        <MirDataTable rows={rowsData} columns={columnsData} />
      </MirModal> */}
    </>
  );
}
