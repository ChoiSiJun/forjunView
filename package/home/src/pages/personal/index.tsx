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
import usePersonaSaveMutation from 'domain/personal/api/usePersonalSaveMutation';
import type {
  Personal,
  PersonalAwards,
  PersonalCompany,
  PersonalSkill,
} from '@domain/personal/Personal';
import SjButton from '@common/ui/elements/button/SjButton';
import CompanyForm from './components/CompanyForm';
import AwardForm from './components/AwardForm';
import SkillForm from './components/SkillForm';
import { useQueryClient } from 'react-query';
import useFileUploadMutation from '@domain/upload/api/useFileUploadMutation';
import useFileDeleteMutation from '@domain/upload/api/useFileDeleteMutation';
import { toast } from 'react-toastify';

export interface PersonalFormValues extends Personal {
  awards: PersonalAwardsFormValues[];
  companies: PersonalCompanyFormValues[];
  skills: PersonalSkillFormValues[];
}
export interface PersonalAwardsFormValues extends PersonalAwards {}
export interface PersonalCompanyFormValues extends PersonalCompany {}
export interface PersonalSkillFormValues extends PersonalSkill {}

// Todo. 리액트 쿼리로 가져오기 필요.
const defaultProfileData: PersonalFormValues = {
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

  profile_image_url: null,
};

const Personal = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: fileUploadMutation } = useFileUploadMutation();
  const { mutateAsync: fileDeleteMutation } = useFileDeleteMutation();
  const { mutateAsync: personalSaveMutation } = usePersonaSaveMutation();

  //미리보기
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  //프로필 이미지
  const [profileImage, setProfileImage] = useState<File | null>(null);

  //회사이력
  const [companies, setcompanies] = useState<PersonalCompanyFormValues[]>(
    defaultProfileData.companies || [],
  );

  //스킬
  const [skills, setSkills] = useState<PersonalSkillFormValues[]>(
    defaultProfileData.skills || [],
  );

  //수상
  const [awards, setAwards] = useState<PersonalAwardsFormValues[]>(
    defaultProfileData.awards || [],
  );

  const formik = useFormik<PersonalFormValues>({
    initialValues: defaultProfileData,
    validationSchema: Yup.object({
      name: Yup.string().required('이름은 필수입니다.'),
      job: Yup.string().required('직무는 필수입니다.'),
    }),
    onSubmit: async values => {
      let profile_image_url = values.profile_image_url;
      let uploadedFileId = null;

      //1. 파일 업로드 먼저 실행
      if (profileImage !== null) {
        const response = await fileUploadMutation(profileImage);
        profile_image_url = response.url;
        uploadedFileId = response.fileId;
      }
      // 💡 최종 제출 시, formik 데이터와 useState 데이터를 통합하여 전송
      const submitData = {
        ...values,
        profile_image_url,
        companies,
        awards,
        skills,
      };

      try {
        await personalSaveMutation(submitData);
        queryClient.invalidateQueries(['personal']);
        toast.success('등록되었습니다.');
      } catch (error) {
        if (uploadedFileId !== null) {
          await fileDeleteMutation(uploadedFileId);
        }
      }
    },
  });

  //프로필 미리보기 이미지 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setProfileImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  //아이템 추가 이벤트
  const handleAddListItem = useCallback(
    (field: 'awards' | 'skills', value: string) => {
      if (!value) return;

      if (field === 'awards') {
        // 💡 객체 배열에 객체 형태로 변환하여 추가
        const newAwardObject: PersonalAwardsFormValues = {
          awardName: value,
        };
        setAwards(prev => [...prev, newAwardObject]);
      }
      if (field === 'skills') {
        // 💡 객체 배열에 객체 형태로 변환하여 추가
        const newSkill: PersonalSkillFormValues = { skillName: value };
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
    (index: number, field: keyof PersonalCompanyFormValues, value: string) => {
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
