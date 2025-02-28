import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Join from '@module/auth/subpage/Join';
import SjTextField from '@common/components/atoms/input/SjTextField';
import { useFormik } from 'formik';
import { useAppDispatch } from '@config/ReduxHooks';
import { authInsert } from '@module/auth/slice/AuthSlice';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AuthMain() {
  //리덕스
  const dispatch = useAppDispatch();

  //상태관리

  //회원가입폼
  const [joinOpen, setJoinOpen] = React.useState(false);

  //핸들러
  const handleJoin = () => {
    setJoinOpen(!joinOpen);
  };

  const loginForm = useFormik({
    initialValues: {
      loginId: '',
      loginPassword: '',
    },
    validationSchema: Yup.object({
      loginId: Yup.string().required('아이디는 필수 항목입니다.'),
      loginPassword: Yup.string()
        .required('비밀번호는 필수 항목입니다.')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/,
          '비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        ),
    }),

    onSubmit: async values => {
      try {
        const reponse = await axios.post(
          import.meta.env.VITE_REST_API + '/user/login',
          values,
          { timeout: 5000 }, // 5초 동안 응답이 없으면 요청 취소
        );

        const jwtToken = reponse?.data?.token;
        if (!jwtToken) {
          throw new Error('Invalid or missing JWT token');
        }
        dispatch(authInsert(jwtToken));
        location.href = '/forjun';
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Unknown error');
        }
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/asset/loginbanner.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={loginForm.handleSubmit}
              sx={{
                mt: 1,
                width: '320px', // 폼 전체의 최소 너비
              }}
            >
              <Grid item xs={12} sm={12} md={12} margin={1}>
                <SjTextField
                  label="ID"
                  name="loginId"
                  size="medium"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  error={
                    !!loginForm.errors.loginId && !!loginForm.touched.loginId
                  }
                  helperText={
                    loginForm.touched.loginId && loginForm.errors.loginId
                      ? loginForm.errors.loginId
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} margin={1}>
                <SjTextField
                  name="loginPassword"
                  label="Password"
                  type="password"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  error={
                    !!loginForm.errors.loginPassword &&
                    !!loginForm.touched.loginPassword
                  }
                  helperText={
                    loginForm.touched.loginPassword &&
                    loginForm.errors.loginPassword
                      ? loginForm.errors.loginPassword
                      : undefined
                  }
                />
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" onClick={handleJoin} variant="body2">
                    {'Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Join joinOpen={joinOpen} handleJoin={handleJoin}></Join>
      </Grid>
    </ThemeProvider>
  );
}
