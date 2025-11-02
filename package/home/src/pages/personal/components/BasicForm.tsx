import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { usePersonal } from '../usePersonal';

const BasicForm = () => {
  const { formik, previewImage, handleFileChange } = usePersonal();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        기본 정보
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            src={previewImage || 'https://via.placeholder.com/150'}
            sx={{ width: 120, height: 120, mb: 1 }}
          />
          <Button variant="contained" component="label">
            이미지 선택
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="이름"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={!!(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="직무"
            name="job"
            value={formik.values.job}
            onChange={formik.handleChange}
            error={!!(formik.touched.job && formik.errors.job)}
            helperText={formik.touched.job && formik.errors.job}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicForm;
