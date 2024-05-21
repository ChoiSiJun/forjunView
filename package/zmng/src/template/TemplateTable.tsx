import DataTable from '@common/components/atoms/table/DataTable';
import TableContents from '@common/components/template/TableContents';

import Grid from '@mui/material/Grid';
import CardLayout from '@template/CardLayout';
import { useRef } from 'react';
import StyledCardContainer from '@template/CardContainer';

import CreateButton from '@common/components/atoms/button/CreateButton';
import UpdateButton from '@common/components/atoms/button/UpdateButton';
import ExportButton from '@common/components/atoms/button/ExportButton';

export default function TemplateTable() {
  const columnsData = [
    { field: 'memberId', headerName: '아이디', width: 100 },
    { field: 'memberName', headerName: '이름', width: 130 },
  ];

  const rowsData = [
    { id: 1, memberId: 'mirtech', memberName: '미르테크' },
    { id: 2, memberId: 'slima', memberName: '슬리마' },
    { id: 3, memberId: 'guest', memberName: 'GUEST' },
  ];

  const InputRef = useRef<HTMLInputElement>(null);
  const handelClick = async () => {
    alert('click!');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledCardContainer>
          <CardLayout
            component={
              <DataTable columns={columnsData} rows={rowsData}></DataTable>
            }
            title={'데이터 테이블'}
            note={[
              'rows(테이블 데이터): Record<string, string | number | null>[]',
              'columns(테이블 헤드): GridColDef[]',
            ]}
            copyCode={'<DataTable rows={[]} columns={[]}></DataTable>'}
          ></CardLayout>
        </StyledCardContainer>
      </Grid>

      <Grid item xs={12}>
        <StyledCardContainer>
          <CardLayout
            component={
              <TableContents
                columns={columnsData}
                rows={rowsData}
                buttonList={[
                  <CreateButton buttonName={'Create'}></CreateButton>,
                  <UpdateButton buttonName={'Update'}></UpdateButton>,
                  <ExportButton buttonName={'Export'}></ExportButton>,
                ]}
                searchInputRef={InputRef}
                onClick={handelClick}
              />
            }
            title={'데이터 테이블 템플릿 예제1'}
            note={[
              'rows(테이블 데이터): Record<string, string | number | null>[]',
              'columns(테이블 헤드): GridColDef[]',
              'buttonList(버튼 LIST): ReactNode[];',
              'searchInputRef(검색창 연결 Ref): React.RefObject<HTMLInputElement>',
              'onClick: (서치바 검색 버튼) => void;',
            ]}
            copyCode={
              '<TableContents columns={columnsData} rows={rowsData} buttonList={[<Button>버튼리스트</Button>]} searchInputRef={InputRef} onClick={handelClick}/>'
            }
          ></CardLayout>
        </StyledCardContainer>
      </Grid>
    </Grid>
  );
}
