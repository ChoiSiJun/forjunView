import MirButton from '@common/components/atoms/button/MirButton';
import MirTextField from '@common/components/atoms/input/MirTextField';
import {
  Box,
  Drawer,
  Grid,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface JoinProps {
  joinOpen: boolean;
  handleJoin: () => void;
}

export default function Join({ joinOpen, handleJoin }: JoinProps) {
  //회원가입 Form 관리
  const joinForm = useFormik({
    initialValues: {
      userId: '',
      password: '',
      name: '',
      email: '',
    },

    validationSchema: Yup.object({
      userId: Yup.string().required('아이디는 필수 항목입니다.'),
      password: Yup.string()
        .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
        .required('비밀번호는 필수 항목입니다.'),
    }),

    onSubmit: async values => {
      try {
        // axios로 폼 데이터 비동기 전송
        const response = await axios.post(
          import.meta.env.VITE_REST_API + +'/user/save',
          values,
        );

        // 서버 응답에 따른 처리
        if (response.data.success) {
          // 성공적인 등록 처리
          console.log('회원가입 성공');
        }
      } catch (error) {
        // 에러 처리
        console.error('회원가입 실패:', error);
      }
    },
  });

  // 아이디 상태 관리
  const [userId, setUserId] = useState('');

  //아이디 중복체크 핸들러.
  const duplicateCheck = async () => {
    const requestData = new URLSearchParams();
    requestData.append('id', userId);
    try {
      const result = await axios.post(
        import.meta.env.VITE_REST_API + '/user/duplicate',
        requestData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // JSON 형식으로 전송
          },
        },
      );

      if (result.data === true) {
        toast.error('중복된 아이디가 존재합니다');
      } else {
        toast.success('가입 가능한 아이디입니다.');
      }
    } catch (error: any) {
      if (error?.response?.data == '') {
        toast.error(error.code);
      } else {
        toast.error(error.response.data);
      }
    }
  };

  //회원가입
  const JoinPrss = () => {};

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
              <MirTextField
                label="아이디"
                name="userId"
                onChange={e => setUserId(e.target.value)} // 상태 업데이트
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <MirButton
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
              <MirTextField label="패스워드" name="passwrod" />
            </Grid>

            {/* 이름 */}
            <Grid item xs={12}>
              <MirTextField label="이름" name="name" />
            </Grid>

            {/* 이메일 */}
            <Grid item xs={12}>
              <MirTextField label="이메일" name="email" />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box textAlign="center" mt={4}>
            <MirButton ButtonType={'create'} buttonName={'가입'} />
          </Box>
        </Paper>
      </Box>
    </Drawer>
  );
}
