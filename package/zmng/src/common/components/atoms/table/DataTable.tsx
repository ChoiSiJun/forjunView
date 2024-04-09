import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface DataTableProps {
  rows: Record<string, string | number | null>[];
  columns: GridColDef[];
}

const DataTable = ({ rows, columns }: DataTableProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
};

export default DataTable;
