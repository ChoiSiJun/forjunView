import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Paper,
  Typography,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import profileImage from '@asset/image/jun.jpg';
import usePersonaSaveMutation from 'domain/personal/api/usePersonalSaveMutation';
import {
  PersonalAwardsParams,
  PersonalCompanyParams,
  PersonalParams,
  PersonalSkillParams,
} from '@domain/personal/types';
import SjButton from '@common/ui/elements/button/SjButton';
import CompanyForm from './components/CompanyForm';
import AwardForm from './components/AwardForm';
import SkillForm from './components/SkillForm';
import { useQueryClient } from 'react-query';

// Todo. 리액트 쿼리로 가져오기 필요.
const defaultProfileData: PersonalParams = {
  name: '최시준',
  job: 'Software Developer',
  companies: [
    { companyName: '(주)미르테크', startDate: '2019.09', endDate: '' },
  ],

  awards: [
    { awardName: '우수논문상 (매장 어플리케이션에 대한 고찰)' },
    { awardName: '서일대학교 수석졸업' },
    { awardName: '서일대학교 공로상' },
  ],

  skills: [
    { skillName: 'Java' },
    { skillName: 'React' },
    { skillName: 'TypeScript' },
    { skillName: 'SpringBoot' },
    { skillName: 'Oracle' },
    { skillName: 'IntelliJ' },
  ],

  profile_image: null,
};

const Personal = () => {
  const queryClient = useQueryClient();
  const mutation = usePersonaSaveMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(profileImage);

  // 💡 초기 데이터 설정: defaultProfileData에서 배열을 가져와 초기화
  const [companies, setcompanies] = useState<PersonalCompanyParams[]>(
    defaultProfileData.companies || [],
  );
  const [skills, setSkills] = useState<PersonalSkillParams[]>(
    defaultProfileData.skills || [],
  );
  const [awards, setAwards] = useState<PersonalAwardsParams[]>(
    defaultProfileData.awards || [],
  );

  const formik = useFormik<PersonalParams>({
    initialValues: defaultProfileData,
    validationSchema: Yup.object({
      name: Yup.string().required('이름은 필수입니다.'),
      job: Yup.string().required('직무는 필수입니다.'),
    }),
    onSubmit: values => {
      // 💡 최종 제출 시, formik 데이터와 useState 데이터를 통합하여 전송
      const submitData = {
        ...values,
        companies,
        awards,
        skills,
        previewImage,
      };
      mutation.mutate(submitData, {
        onSuccess: () => {
          queryClient.invalidateQueries(['personal']);
        },
      });
    },
  });

  //프로필 이미지 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue('profile_image', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(profileImage);
    }
  };

  //아이템 추가 이벤트
  const handleAddListItem = useCallback(
    (field: 'awards' | 'skills', value: string) => {
      if (!value) return;

      if (field === 'awards') {
        // 💡 객체 배열에 객체 형태로 변환하여 추가
        const newAwardObject: PersonalAwardsParams = {
          awardName: value,
        };
        setAwards(prev => [...prev, newAwardObject]);
      }
      if (field === 'skills') {
        // 💡 객체 배열에 객체 형태로 변환하여 추가
        const newSkill: PersonalSkillParams = { skillName: value };
        setSkills(prev => [...prev, newSkill]);
      }
    },
    [setAwards, setSkills],
  );

  //아이템 제거 이벤트
  const handleRemoveListItem = useCallback(
    (field: 'awards' | 'skills', index: number) => {
      if (field === 'awards')
        setAwards(prev => prev.filter((_, i) => i !== index));
      if (field === 'skills')
        setSkills(prev => prev.filter((_, i) => i !== index));
    },
    [setAwards, setSkills],
  );

  //회사 추가 이벤트
  const handleAddCompany = useCallback(() => {
    setcompanies(prev => [
      ...prev,
      { companyName: '', startDate: '', endDate: '' },
    ]);
  }, [setcompanies]);

  //회사 제거 이벤트
  const handleRemoveCompany = (index: number) => {
    setcompanies(prev => {
      const updatedCompanies = [...prev];

      if (index === 0) {
        updatedCompanies[0] = {
          companyName: '',
          startDate: '',
          endDate: '',
        };
      } else {
        return prev.filter((_, i) => i !== index);
      }

      return updatedCompanies;
    });
  };

  // 💡 회사 수정 이벤트
  const handleCompanyChange = useCallback(
    (index: number, field: keyof PersonalCompanyParams, value: string) => {
      setcompanies(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [setcompanies],
  );

  return (
    <form onSubmit={formik.handleSubmit}>
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

        {/* 회사 정보 */}
        <CompanyForm
          companies={companies}
          handleCompanyChange={handleCompanyChange}
          handleRemoveCompany={handleRemoveCompany}
          handleAddCompany={handleAddCompany}
        />

        {/* 수상 내역 */}
        <AwardForm
          awards={awards}
          handleAddListItem={(value: string) =>
            handleAddListItem('awards', value)
          }
          handleRemoveListItem={idx => handleRemoveListItem('awards', idx)}
        />

        {/* 기술 */}
        <SkillForm
          skills={skills}
          handleAddListItem={(value: string) =>
            handleAddListItem('skills', value)
          }
          handleRemoveListItem={idx => handleRemoveListItem('skills', idx)}
        />

        {/* 제출 버튼 */}
        <SjButton ButtonType={'submit'} buttonName={'등록 수정'} />
      </Box>
    </form>
  );
};

export default Personal;
