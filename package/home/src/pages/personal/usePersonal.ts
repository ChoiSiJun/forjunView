import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import usePersonalQuery from '@domain/personal/api/usePersonalQuery';
import usePersonaSaveMutation from '@domain/personal/api/usePersonalSaveMutation';
import useFileUploadMutation from '@domain/upload/api/useFileUploadMutation';
import useFileDeleteMutation from '@domain/upload/api/useFileDeleteMutation';

import {
  Personal,
  PersonalAwards,
  PersonalCompany,
  PersonalSkill,
} from '@domain/personal/Personal';
import { PersonalDetailResponse } from '@domain/personal/api/personalApi';

export interface PersonalFormValues extends Personal {
  awards: PersonalAwardsFormValues[];
  companies: PersonalCompanyFormValues[];
  skills: PersonalSkillFormValues[];
}
export interface PersonalAwardsFormValues extends PersonalAwards {}
export interface PersonalCompanyFormValues extends PersonalCompany {}
export interface PersonalSkillFormValues extends PersonalSkill {}

const FormValuesConvert = (
  personalData: PersonalDetailResponse | undefined,
) => {
  if (!personalData) {
    return {
      name: '',
      job: '',
      profile_image_url: null,
      companies: [],
      awards: [],
      skills: [],
    } as PersonalFormValues;
  }

  return {
    ...personalData,
    companies: personalData.companies || [],
    awards: personalData.awards || [],
    skills: personalData.skills || [],
  } as PersonalFormValues;
};

export const usePersonal = () => {
  //API 데이터
  const personalData = usePersonalQuery().data;

  //API 데이터를 Form 형식으로 파싱

  const loadedData = useMemo(() => {
    return FormValuesConvert(personalData);
  }, [personalData]);

  //Query Client
  const queryClient = useQueryClient();

  //파일 업로드 Mutation
  const { mutateAsync: fileUploadMutation } = useFileUploadMutation();

  //파일 삭제 Mutation
  const { mutateAsync: fileDeleteMutation } = useFileDeleteMutation();

  //자기소개서 저장 Mutation
  const { mutateAsync: personalSaveMutation } = usePersonaSaveMutation();

  //상태관리
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [companies, setCompanies] = useState<PersonalCompanyFormValues[]>([]);
  const [skills, setSkills] = useState<PersonalSkillFormValues[]>([]);
  const [awards, setAwards] = useState<PersonalAwardsFormValues[]>([]);

  //formik
  const formik = useFormik<PersonalFormValues>({
    initialValues: loadedData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('이름은 필수입니다.'),
      job: Yup.string().required('직무는 필수입니다.'),
    }),
    onSubmit: async values => {
      let profile_image_url = values.profile_image_url;
      let uploadedFileId = null;

      if (profileImage) {
        const response = await fileUploadMutation(profileImage);
        profile_image_url = response.url;
        uploadedFileId = response.fileId;
      }

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
        if (uploadedFileId) {
          await fileDeleteMutation(uploadedFileId);
        }
      }
    },
  });

  // 이미지 선택
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

  // 리스트 추가/삭제
  const handleAddListItem = useCallback(
    (field: 'awards' | 'skills', value: string) => {
      if (!value) return;
      if (field === 'awards')
        setAwards(prev => [...prev, { awardName: value }]);
      if (field === 'skills')
        setSkills(prev => [...prev, { skillName: value }]);
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

  // 회사 관리
  const handleAddCompany = useCallback(() => {
    setCompanies(prev => [
      ...prev,
      { companyName: '', startDate: '', endDate: '' },
    ]);
  }, []);

  const handleRemoveCompany = (index: number) => {
    setCompanies(prev => {
      const updated = [...prev];
      if (index === 0)
        updated[0] = { companyName: '', startDate: '', endDate: '' };
      else return prev.filter((_, i) => i !== index);
      return updated;
    });
  };

  const handleCompanyChange = useCallback(
    (index: number, field: keyof PersonalCompanyFormValues, value: string) => {
      setCompanies(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [],
  );

  useEffect(() => {
    if (loadedData) {
      setCompanies(loadedData.companies || []);
      setSkills(loadedData.skills || []);
      setAwards(loadedData.awards || []);
      setPreviewImage(loadedData.profile_image_url || null);

      console.log(loadedData.profile_image_url);
    }
  }, [loadedData]);

  return {
    formik,
    previewImage,
    handleFileChange,
    companies,
    skills,
    awards,
    handleAddListItem,
    handleRemoveListItem,
    handleAddCompany,
    handleRemoveCompany,
    handleCompanyChange,
  };
};
