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

  //미리보기 이미지 상태
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  //실제 파일 이미지 상태
  const [profileImage, setProfileImage] = useState<File | null>(null);

  //formik
  const formik = useFormik<PersonalFormValues>({
    initialValues: loadedData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('이름은 필수입니다.'),
      job: Yup.string().required('직무는 필수입니다.'),
    }),
    onSubmit: async () => {
      // formik의 현재 values를 직접 사용하여 최신 상태 보장
      const currentValues = formik.values;
      let profile_image_url = null;
      let uploadedFileId = null;

      if (profileImage) {
        const response = await fileUploadMutation(profileImage);
        profile_image_url = response.url;
        uploadedFileId = response.fileId;
      }

      const submitData = {
        ...currentValues,
        profile_image_url,
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
      const newItem =
        field === 'awards' ? { awardName: value } : { skillName: value };

      const currentList =
        field === 'awards' ? formik.values.awards : formik.values.skills;
      const updatedList = [...currentList, newItem];

      formik.setFieldValue(field, updatedList);
    },
    [formik],
  );

  const handleRemoveListItem = useCallback(
    (field: 'awards' | 'skills', index: number) => {
      const currentList =
        field === 'awards' ? formik.values.awards : formik.values.skills;
      const updatedList = currentList.filter((_, i) => i !== index);

      formik.setFieldValue(field, updatedList);
    },
    [formik],
  );

  // 회사 관리
  const handleAddCompany = useCallback(() => {
    const updatedCompanies = [
      ...formik.values.companies,
      { companyName: '', startDate: '', endDate: '' },
    ];
    formik.setFieldValue('companies', updatedCompanies);
  }, [formik]);

  const handleRemoveCompany = useCallback(
    (index: number) => {
      const currentCompanies = formik.values.companies;
      let updatedCompanies: PersonalCompanyFormValues[];

      if (index === 0) {
        updatedCompanies = [...currentCompanies];
        updatedCompanies[0] = { companyName: '', startDate: '', endDate: '' };
      } else {
        updatedCompanies = currentCompanies.filter((_, i) => i !== index);
      }

      formik.setFieldValue('companies', updatedCompanies);
    },
    [formik],
  );

  const handleCompanyChange = useCallback(
    (index: number, field: keyof PersonalCompanyFormValues, value: string) => {
      const currentCompanies = formik.values.companies;
      const updatedCompanies = [...currentCompanies];
      updatedCompanies[index] = { ...updatedCompanies[index], [field]: value };

      formik.setFieldValue('companies', updatedCompanies);
    },
    [formik],
  );

  useEffect(() => {
    if (loadedData) {
      setPreviewImage(loadedData.profile_image_url || null);
    }
  }, [loadedData]);

  return {
    formik,
    previewImage,
    handleFileChange,
    companies: formik.values.companies,
    skills: formik.values.skills,
    awards: formik.values.awards,
    handleAddListItem,
    handleRemoveListItem,
    handleAddCompany,
    handleRemoveCompany,
    handleCompanyChange,
  };
};
