import { DataGrid, GridColDef, GridSlots } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '@common/components/atoms/table/customOverlay/NoRowsOverlay';

export const MirDataTableGuide = {
  title: '데이터 테이블',
  code: `<MirDataTable rows={rows} columns={columns}/>`,
  requireNote: ['rows : 테이블 데이터', 'columns : 테이블 헤더'],
  optionNote: [],
};

export interface MirDataTableProps {
  rows: Record<string, string | number | null>[];
  columns: GridColDef[];
}

const MirDataTable = ({ rows, columns }: MirDataTableProps) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        slots={{
          loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
};

export default MirDataTable;
