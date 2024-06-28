import Grid from '@mui/material/Grid';
import CardLayout from '@template/CardLayout';

import MirDataTable, {
  MirDataTableGuide,
} from '@common/components/atoms/table/MirDataTable';

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} minWidth={800}>
        <CardLayout
          component={[
            {
              component: (
                <MirDataTable
                  rows={rowsData}
                  columns={columnsData}
                ></MirDataTable>
              ),
            },
          ]}
          title={MirDataTableGuide.title}
          requireNote={MirDataTableGuide.requireNote}
          optionNote={MirDataTableGuide.optionNote}
          copyCode={MirDataTableGuide.code}
        ></CardLayout>
      </Grid>
    </Grid>
  );
}
