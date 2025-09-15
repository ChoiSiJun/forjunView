import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Chip,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import profileImage from '@asset/image/jun.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import usePersonaSaveMutation from '@api/module/personal/usePersonalSaveMutation';

interface CompanyEntry {
  company: string;
  startDate: string;
  endDate: string;
}

export interface PersonalInsertParam {
  name: string;
  job: string;
  imageFile: File | null;
  companies: CompanyEntry[];
  awards: string[];
  skills: string[];
}

const defaultProfileData: PersonalInsertParam = {
  name: '최시준',
  job: 'Software Developer',
  awards: [
    '우수논문상 (매장 어플리케이션에 대한 고찰)',
    '서일대학교 수석졸업',
    '서일대학교 공로상',
  ],
  skills: ['Java', 'React', 'TypeScript', 'SpringBoot', 'Oracle', 'IntelliJ'],
  companies: [{ company: '(주)미르테크', startDate: '2019.09', endDate: '' }],
  imageFile: null,
};

const Personal = () => {
  //저장 Mutatation
  const mutation = usePersonaSaveMutation();
  //미리보기 이미지
  const [previewImage, setPreviewImage] = useState<string | null>(profileImage);

  //회사 이력
  const [companies, setcompanies] = useState<CompanyEntry[]>(
    defaultProfileData.companies,
  );

  //기술 이력
  const [skills, setSkills] = useState<string[]>(defaultProfileData.skills);

  //수상이력
  const [awards, setAwards] = useState<string[]>(defaultProfileData.awards);

  const formik = useFormik<PersonalInsertParam>({
    initialValues: defaultProfileData,
    validationSchema: Yup.object({
      name: Yup.string().required('이름은 필수입니다.'),
      job: Yup.string().required('직무는 필수입니다.'),
    }),
    onSubmit: values => {
      const fullData = {
        ...values,
        previewImage,
        skills,
        awards,
        companies,
      };
      mutation.mutate(fullData);
      // TODO: 서버 API 연동
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue('imageFile', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(profileImage);
    }
  };

  const handleAddListItem = useCallback(
    (field: 'awards' | 'skills', value: string) => {
      if (!value) return;
      if (field === 'awards') setAwards(prev => [...prev, value]);
      if (field === 'skills') setSkills(prev => [...prev, value]);
    },
    [],
  );

  const handleRemoveListItem = useCallback(
    (field: 'awards' | 'skills', index: number) => {
      if (field === 'awards')
        setAwards(prev => prev.filter((_, i) => i !== index));
      if (field === 'skills')
        setSkills(prev => prev.filter((_, i) => i !== index));
    },
    [],
  );

  const handleAddCompany = () => {
    setcompanies(prev => [
      ...prev,
      { company: '', startDate: '', endDate: '' },
    ]);
  };
  const handleRemoveCompany = (index: number) => {
    setcompanies(prev => prev.filter((_, i) => i !== index));
  };
  const handleCompanyChange = (
    index: number,
    field: keyof CompanyEntry,
    value: string,
  ) => {
    setcompanies(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 900,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* 기본 정보 */}
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
              error={!!formik.errors.name}
              helperText={formik.errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="직무"
              name="job"
              value={formik.values.job}
              onChange={formik.handleChange}
              error={!!formik.errors.job}
              helperText={formik.errors.job}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* 회사 정보 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          회사 정보
        </Typography>
        {companies.map((entry, idx) => (
          <Grid
            container
            spacing={1}
            key={idx}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="회사"
                value={entry.company}
                onChange={e =>
                  handleCompanyChange(idx, 'company', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="입사일 (YYYY.MM)"
                value={entry.startDate}
                onChange={e =>
                  handleCompanyChange(idx, 'startDate', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="퇴사일 (YYYY.MM)"
                value={entry.endDate}
                onChange={e =>
                  handleCompanyChange(idx, 'endDate', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                color="error"
                onClick={() => handleRemoveCompany(idx)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddCompany}
          variant="outlined"
        >
          회사 추가
        </Button>
      </Paper>

      {/* 수상 내역 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          수상 내역
        </Typography>
        <TextField
          fullWidth
          label="수상 내역 추가"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddListItem('awards', (e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {awards.map((award, idx) => (
            <Chip
              key={idx}
              label={award}
              onDelete={() => handleRemoveListItem('awards', idx)}
            />
          ))}
        </Box>
      </Paper>

      {/* 기술 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          기술
        </Typography>
        <TextField
          fullWidth
          label="기술 추가"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddListItem('skills', (e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {skills.map((skill, idx) => (
            <Chip
              key={idx}
              label={skill}
              onDelete={() => handleRemoveListItem('skills', idx)}
            />
          ))}
        </Box>
      </Paper>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        onClick={formik.handleSubmit}
      >
        등록 / 수정
      </Button>
    </Box>
  );
};

export default Personal;
