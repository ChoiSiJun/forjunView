import SjTextField from '@common/ui/elements/input/SjTextField';
import SjText from '@common/ui/elements/text/SjText';
import { PersonalCompanyParams } from '@domain/personal/types';
import { Grid, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SjButton from '@common/ui/elements/button/SjButton';
import { useEffect } from 'react';

interface CompanyFormProps {
  /** 렌더링할 회사 정보 배열 */
  companies: PersonalCompanyParams[];

  /** 필드 값 변경 핸들러: (index, fieldName, value) */
  handleCompanyChange: (
    index: number,
    field: keyof PersonalCompanyParams,
    value: string,
  ) => void;

  /** 항목 제거 핸들러: (index) */
  handleRemoveCompany: (index: number) => void;

  /** 항목 추가 핸들러 */
  handleAddCompany: () => void;
}
const CompanyForm = ({
  companies,
  handleCompanyChange,
  handleRemoveCompany,
  handleAddCompany,
}: CompanyFormProps) => {
  // companies가 비어있으면 1개 기본 row 추가
  useEffect(() => {
    if (companies.length === 0) {
      handleAddCompany();
    }
  }, []);

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
