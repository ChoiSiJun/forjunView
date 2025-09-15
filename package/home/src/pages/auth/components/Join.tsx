import SjButton from '@common/ui/elements/button/SjButton';
import SjTextField from '@common/ui/elements/input/SjTextField';
import {
  Box,
  Drawer,
  Grid,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useState } from 'react';
import { useJoinMutation } from '@api/module/auth/useJoinMutation';
import { idDuplicateCheck } from '@api/module/auth/idDuplicateCheck';

interface JoinProps {
  joinOpen: boolean;
  handleJoin: () => void;
}

export default function Join({ joinOpen, handleJoin }: JoinProps) {
  //회원가입 Mutation
  const joinMutation = useJoinMutation(handleJoin);

  //Id 중복체크 여부
  const [idDuplicateConfirm, setIdDuplicateConfirm] = useState(false);

  //Form 변경 이벤트 캐치
  const handelCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    joinForm.handleChange(e);
    if (e.target.name === 'userId') {
      setIdDuplicateConfirm(false);
    }
  };

  //회원가입 Form 관리
  const joinForm = useFormik({
    initialValues: {
      userId: '',
      password: '',
      userName: '',
      email: '',
    },

    validationSchema: Yup.object({
      userId: Yup.string().required('아이디는 필수 항목입니다.'),
      password: Yup.string()
        .required('비밀번호는 필수 항목입니다.')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          '비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        ),
      userName: Yup.string().required('이름은 필수 항목입니다.'),
      email: Yup.string()
        .email('이메일 형식이 아닙니다.')
        .required('이메일은 필수 항목입니다.'),
    }),

    onSubmit: async values => {
      if (idDuplicateConfirm) {
        joinMutation.mutate(values);
      } else {
        toast.error('아이디 중복체크를 해주세요.');
      }
    },
    validateOnChange: true,
  });

  //아이디 중복체크 핸들러.
  const duplicateCheck = async () => {
    if (!joinForm.values.userId) {
      toast.error('아이디를 입력해주세요.');
      return;
    }
    const result = await idDuplicateCheck(joinForm.values.userId);
    if (result !== 'error') {
      if (result === true) {
        toast.error('중복된 아이디가 존재합니다');
      } else {
        toast.success('가입 가능한 아이디입니다.');
        setIdDuplicateConfirm(true);
      }
    }
  };

  return (
    <Drawer
      anchor="right"
      open={joinOpen}
      onClose={handleJoin}
      sx={{
        '& .MuiDrawer-paper': {
          width: '50%',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f9f9f9', // 부드러운 배경색
        },
      }}
    >
      {/* 전체 Wrapper */}
      <Box width="100%" maxWidth="400px" p={3}>
        {/* Header */}
        <Box
          textAlign="center"
          py={3}
          mb={4}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            회원가입
          </Typography>
          <Typography variant="body2">
            아래 정보를 입력하여 회원가입을 진행하세요.
          </Typography>
        </Box>

        {/* Form */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={3}>
            {/* 아이디 */}
            <Grid item xs={12}>
              <SjTextField
                label="ID"
                name="userId"
                onChange={handelCustomChange}
                onBlur={joinForm.handleBlur}
                error={!!joinForm.errors.userId && !!joinForm.touched.userId}
                helperText={
                  joinForm.touched.userId && joinForm.errors.userId
                    ? joinForm.errors.userId
                    : undefined
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <SjButton
                        ButtonType={'input'}
                        buttonName={'중복체크'}
                        onClick={duplicateCheck}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* 패스워드 */}
            <Grid item xs={12}>
              <SjTextField
                label="Password"
                name="password"
                type="password"
                onChange={joinForm.handleChange}
                onBlur={joinForm.handleBlur}
                error={
                  !!joinForm.errors.password && !!joinForm.touched.password
                }
                helperText={
                  joinForm.touched.password && joinForm.errors.password
                    ? joinForm.errors.password
                    : undefined
                }
              />
            </Grid>

            {/* 이름 */}
            <Grid item xs={12}>
              <SjTextField
                label="Name"
                name="userName"
                onChange={joinForm.handleChange}
                onBlur={joinForm.handleBlur}
                error={
                  !!joinForm.errors.userName && !!joinForm.touched.userName
                }
                helperText={
                  joinForm.touched.userName && joinForm.errors.userName
                    ? joinForm.errors.userName
                    : undefined
                }
              />
            </Grid>

            {/* 이메일 */}
            <Grid item xs={12}>
              <SjTextField
                label="E-MAIL"
                name="email"
                onChange={joinForm.handleChange}
                onBlur={joinForm.handleBlur}
                error={!!joinForm.errors.email && !!joinForm.touched.email}
                helperText={
                  joinForm.touched.email && joinForm.errors.email
                    ? joinForm.errors.email
                    : undefined
                }
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box textAlign="center" mt={4}>
            <SjButton
              ButtonType={'confirm'}
              buttonName={'가입'}
              onClick={joinForm.handleSubmit}
            />
          </Box>
        </Paper>
      </Box>
    </Drawer>
  );
}
