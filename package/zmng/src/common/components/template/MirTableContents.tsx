import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SearchField, {
  MirSearchFieldProps,
} from '@common/components/atoms/input/MirSearchField';
import DataTable, {
  MirDataTableProps,
} from '@common/components/atoms/table/MirDataTable';

import MirToolbarContent, {
  MirToolbarContentProps,
} from '@common/components/molecule/MirToolbarContent';

interface MirTableContentsProps
  extends MirDataTableProps,
    MirToolbarContentProps,
    MirSearchFieldProps {}

const MirTableContents = ({
  rows,
  columns,
  buttonList,
  InputRef,
  onClick,
}: MirTableContentsProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={12}>
        <MirToolbarContent buttonList={buttonList} />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <SearchField InputRef={InputRef} onClick={onClick} />
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
          <DataTable rows={rows} columns={columns} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MirTableContents;
