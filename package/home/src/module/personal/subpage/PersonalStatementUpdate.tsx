import SjTextField from '@common/components/atoms/input/SjTextField';
import SjList from '@common/components/atoms/text/SjList';
import SjText from '@common/components/atoms/text/SjText';
import {
  Box,
  Divider,
  Grid,
  Stack,
  Paper,
  IconButton,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';

import SjButton from '@common/components/atoms/button/SjButton';
import { toast } from 'react-toastify';

export default function PersonalStatementUpdate() {
  //이미지 데이터 함수
  const [image, setImage] = useState<string | null>(null);

  // 이미지 선택 이벤트 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //회사정보 관리
  const [InputCompanyData, setInputCompanyData] = useState({
    companyName: '',
    companyStartDay: '',
    companyEndDay: '',
  });

  const [companyDataList, setCompanyDataList] = useState<
    { companyName: string; companyStartDay: string; companyEndDay: string }[]
  >([]);

  const [companyDisplayList, setCompanyDisplayList] = useState<
    { primary: string; secondary: string }[]
  >([]);

  const [selectIndex, setSelectIndex] = useState<number | null>(null);

  const handleChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCompanyData({
      ...InputCompanyData,
      [e.target.name]: e.target.value,
    });

    if (selectIndex != null) {
      setCompanyDataList(prevList =>
        prevList.map((item, i) =>
          i === selectIndex ? { ...item, InputCompanyData } : item,
        ),
      );

      const newDisplayData = {
        primary: InputCompanyData.companyName,
        secondary:
          InputCompanyData.companyStartDay +
          '~' +
          InputCompanyData.companyEndDay,
      };

      setCompanyDisplayList(prevList =>
        prevList.map((item, i) =>
          i === selectIndex ? { ...item, ...newDisplayData } : item,
        ),
      );
    }
  };

  const selectCompany = (index: number): void => {
    setSelectIndex(index);

    const selectData = companyDataList[index];
    setInputCompanyData({
      companyName: selectData.companyName,
      companyStartDay: selectData.companyStartDay,
      companyEndDay: selectData.companyEndDay,
    });
  };

  //회사정보 추가.
  const addCompany = () => {
    if (InputCompanyData.companyName === '') {
      toast.error('회사명을 입력해주세요.');
      return false;
    }

    if (InputCompanyData.companyStartDay === '') {
      toast.error('입사일을 입력해주세요.');
      return false;
    }

    if (InputCompanyData.companyEndDay === '') {
      toast.error('퇴사일을 입력해주세요.');
      return false;
    }
    setCompanyDataList([...companyDataList, InputCompanyData]);
    setCompanyDisplayList([
      ...companyDisplayList,
      {
        primary: InputCompanyData.companyName,
        secondary:
          InputCompanyData.companyStartDay +
          '~' +
          InputCompanyData.companyEndDay,
      },
    ]);

    setInputCompanyData({
      companyName: '',
      companyStartDay: '',
      companyEndDay: '',
    });
  };

  //회사정보 삭제
  const removeCompany = () => {
    if (selectIndex == null) {
      toast.error('클릭한 회사정보가 없습니다.');
    }
    setCompanyDataList(prevlist =>
      prevlist.filter((_, i) => i !== selectIndex),
    );
    setCompanyDisplayList(prevlist =>
      prevlist.filter((_, i) => i !== selectIndex),
    );
  };

  //자기소개서 Form 관리
  const PersonalStatementForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: {
        type: 'userName',
        label: '이름',
        data: '',
      },

      userBirthDay: {
        type: 'userBirthDay',
        label: '생년월일',
        data: '',
      },

      userCompany: [
        {
          companyName: {
            type: 'companyName',
            label: '회사명',
            data: '',
          },

          companyStartDate: {
            type: 'companyStartDate',
            label: '입사일',
            data: '',
          },
          companyEndDate: {
            type: 'companyEndDate',
            label: '퇴사일',
            data: '',
          },
        },
      ],

      userSkill: [
        {
          type: 'userSkill1',
          label: '스킬셋',
          data: '',
        },
      ],
      userLicense: [
        {
          type: 'userLicense',
          label: '자격증',
          data: '',
        },
      ],
      userAwards: [
        {
          type: 'userAwards',
          label: '수상내역',
          data: '',
        },
      ],
    },

    onSubmit: async values => {
      console.log('제출된값  : ' + values);
    },
    validateOnChange: true,
  });

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          {/* 📌 개인정보 섹션 */}
          <Box>
            <SjText variant="h5" text="개인정보" />
            <Grid container spacing={3} alignItems="center">
              {/* 📌 프로필 이미지 영역 */}
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                display="flex"
                justifyContent="center"
              >
                <label htmlFor="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <IconButton component="span">
                    <Avatar
                      src={image || '/default-avatar.png'}
                      sx={{ width: 120, height: 120, cursor: 'pointer' }}
                    />
                  </IconButton>
                </label>
              </Grid>

              {/* 📌 입력 필드 영역 */}
              <Grid item xs={12} md={6} lg={6}>
                <Stack spacing={2}>
                  <SjTextField
                    label={PersonalStatementForm.values.userName.label}
                    name="userName.data"
                    onChange={PersonalStatementForm.handleChange}
                    onBlur={PersonalStatementForm.handleBlur}
                    value={PersonalStatementForm.values.userName.data}
                  />
                  <SjTextField
                    label={PersonalStatementForm.values.userBirthDay.label}
                    name="userBirthDay.data"
                    onChange={PersonalStatementForm.handleChange}
                    onBlur={PersonalStatementForm.handleBlur}
                    value={PersonalStatementForm.values.userBirthDay.data}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 회사 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="회사" />
            <Stack spacing={2} marginTop={2}>
              <Box border={2} borderColor={'black'}>
                <SjList
                  renderType={'1'}
                  dataList={companyDisplayList}
                  handleClick={selectCompany}
                />
              </Box>

              <Stack direction={'column'} spacing={1}>
                <SjTextField
                  label="회사명"
                  name="companyName"
                  value={InputCompanyData.companyName}
                  onChange={handleChangeCompany}
                />
                <SjTextField
                  label="입사일"
                  value={InputCompanyData.companyStartDay}
                  name="companyStartDay"
                  onChange={handleChangeCompany}
                />
                <SjTextField
                  label="퇴사일"
                  value={InputCompanyData.companyEndDay}
                  name="companyEndDay"
                  onChange={handleChangeCompany}
                />
              </Stack>

              <Stack justifyContent="flex-end" direction={'row'} spacing={1}>
                <SjButton
                  ButtonType={'create'}
                  buttonName={'추가'}
                  onClick={addCompany}
                />
                <SjButton
                  ButtonType={'delete'}
                  onClick={removeCompany}
                  buttonName={'삭제'}
                ></SjButton>
              </Stack>
            </Stack>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 스킬 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="스킬" />
            <Stack spacing={2} marginTop={2}>
              <SjTextField label="스킬셋" name="skills" />
            </Stack>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 자격증 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="자격증" />
            <Stack spacing={2} marginTop={2}>
              <SjTextField label="자격증명" name="certificate" />
            </Stack>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* 📌 수상 정보 섹션 */}
          <Box>
            <SjText variant="h5" text="수상 정보" />
            <Stack spacing={2} marginTop={2}>
              <SjTextField label="수상명" name="award" />
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
