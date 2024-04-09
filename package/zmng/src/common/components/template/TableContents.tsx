import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SearchField from '@common/components/atoms/input/SearchField';
import DataTable, {
  DataTableProps,
} from '@common/components/atoms/table/DataTable';
import { ReactNode } from 'react';

interface TableContentsProps extends DataTableProps {
  toolbar: ReactNode;
}

const TableContents = ({ toolbar }: TableContentsProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={12}>
        {toolbar}
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <SearchField />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DataTable rows={[]} columns={[]} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TableContents;
