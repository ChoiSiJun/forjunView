import SjTextField from '@common/ui/elements/input/SjTextField';
import SjText from '@common/ui/elements/text/SjText';
import { Grid, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SjButton from '@common/ui/elements/button/SjButton';

// 💡 usePersonal 훅 임포트 (경로는 프로젝트 구조에 맞게 조정하세요)
import { usePersonal } from '../usePersonal';

const CompanyForm = () => {
  // 💡 [핵심 수정] 필요한 상태와 핸들러를 훅에서 직접 가져옵니다.
  const {
    companies,
    handleCompanyChange,
    handleRemoveCompany,
    handleAddCompany,
  } = usePersonal();

  return (
    <Paper sx={{ p: 3 }}>
      <SjText text={'회사정보'} renderType="title" />
      {companies.map((entry, idx) => (
        <Grid
          container
          spacing={1}
          key={idx}
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Grid item xs={4}>
            <SjTextField
              label="회사"
              value={entry.companyName}
              onChange={e =>
                handleCompanyChange(idx, 'companyName', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <SjTextField
              label="입사일 (YYYY.MM)"
              value={entry.startDate}
              onChange={e =>
                handleCompanyChange(idx, 'startDate', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <SjTextField
              label="퇴사일 (YYYY.MM)"
              value={entry.endDate}
              onChange={e =>
                handleCompanyChange(idx, 'endDate', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="error" onClick={() => handleRemoveCompany(idx)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <SjButton
        ButtonType={'input'}
        buttonName={'회사추가'}
        onClick={handleAddCompany}
      />
    </Paper>
  );
};

export default CompanyForm;
