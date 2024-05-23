import Grid from '@mui/material/Grid';

import CreateButton from '@common/components/atoms/button/MirCreateButton';

import CardLayout from '@template/CardLayout';
import StyledCardContainer from '@template/CardContainer';
import MainModal from '@common/components/atoms/modal/MirModal';
import React from 'react';
import ModalContent from '@common/components/molecule/ModalContent';
import UpdateButton from '@common/components/atoms/button/MirUpdateButton';
import ExportButton from '@common/components/atoms/button/MirExportButton';
import DataTable from '@common/components/atoms/table/MirDataTable';

export default function TemplateModal() {
  const [openModal1, setopenModal1] = React.useState(false);
  const handleModal1Open = () => setopenModal1(true);
  const handleModal1Close = () => setopenModal1(false);

  const [openModal2, setopenModal2] = React.useState(false);
  const handleModal2Open = () => setopenModal2(true);
  const handleModal2Close = () => setopenModal2(false);

  const columnsData = [
    { field: 'memberId', headerName: '아이디', width: 100 },
    { field: 'memberName', headerName: '이름', width: 130 },
  ];

  const rowsData = [
    { id: 1, memberId: 'mirtech', memberName: '미르테크' },
    { id: 2, memberId: 'slima', memberName: '슬리마' },
    { id: 3, memberId: 'guest', memberName: 'GUEST' },
  ];

  const Modal1SourceCode = `

    const [openState, setOpenState] = React.useState(false);
    const handleModalOpen = () => setOpenState(true);
    const handleModalClose = () => setOpenState(false);
  

    <CreateButton
    buttonName={'모달열기 버튼'}
    onClick={handleModalOpen}>
    
    </CreateButton>

    <MainModal modalOpen={openState} closeModalEvent={handleModalClose}>
      모달에 출력할 내용입력
    </MainModal>

  `;

  const Modal2SourceCode = `

  const [openState, setOpenState] = React.useState(false);
  const handleModalOpen = () => setOpenState(true);
  const handleModalClose = () => setOpenState(false);


  <CreateButton
  buttonName={'모달열기 버튼'}
  onClick={handleModalOpen}>
  
  </CreateButton>

  <ModalContent
    modalOpen={openState}
    closeModalEvent={handleModalClose}
    title={'모달제목'}
    buttonList={[
        버튼배열값
    ]}
  >
    모달내용
  </ModalContent>

`;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3} minWidth={400} height={500}>
          <StyledCardContainer>
            <CardLayout
              component={[
                <CreateButton
                  buttonName={'Modal Open'}
                  onClick={handleModal1Open}
                ></CreateButton>,
              ]}
              title={'기본모달'}
              note={[
                'modalOpen: 모달 열림상태값',
                'width: 모달 넓이값',
                'closeModalEvent: 모달닫힘 이벤트',
                'children: 모달에 들어갈 내용',
              ]}
              copyCode={Modal1SourceCode}
            ></CardLayout>
          </StyledCardContainer>
        </Grid>

        <Grid item xs={3} minWidth={400} height={500}>
          <StyledCardContainer>
            <CardLayout
              component={
                <CreateButton
                  buttonName={'Modal Open'}
                  onClick={handleModal2Open}
                ></CreateButton>
              }
              title={'모달 템플릿 예제1'}
              note={[
                'title : 모달제목',
                'subTitle : 모달 부제목',
                'modalType : 모달타입 (Default : MainModal)',
                'modalOpen: 모달 열림상태값',
                'modalSize: 모달 넓이값 (Default : 800px)',
                'closeModalEvent: 모달닫힘 이벤트',
                'children: 모달에 들어갈 내용',
                'buttonList : 모달 하단에 들어갈 버튼',
              ]}
              copyCode={Modal2SourceCode}
            ></CardLayout>
          </StyledCardContainer>
        </Grid>
      </Grid>

      <MainModal modalOpen={openModal1} closeModalEvent={handleModal1Close}>
        모달내용
      </MainModal>

      <ModalContent
        modalOpen={openModal2}
        closeModalEvent={handleModal2Close}
        title={'테스트모달'}
        buttonList={[
          <CreateButton buttonName={'Create'}></CreateButton>,
          <UpdateButton buttonName={'Update'}></UpdateButton>,
          <ExportButton buttonName={'Export'}></ExportButton>,
        ]}
      >
        <DataTable columns={columnsData} rows={rowsData}></DataTable>
      </ModalContent>
    </>
  );
}
