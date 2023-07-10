import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // email: 'demo@demo.com',
  // password: 'Password123!',


  const click = async () => {
    window.sessionStorage.setItem('authenticated', 'false')
    try {
      console.log(1);
      event.preventDefault();
      console.log(2);
      await auth.signIn(email, password);
      console.log(3);
      window.sessionStorage.setItem('authenticated', 'true')
    } catch (err) {
      alert('Проверьте почту или пароль')
    }
    console.log(window.sessionStorage.getItem('authenticated'));
    if (window.sessionStorage.getItem('authenticated') === 'true') {
      router.push('/');
    }
  }

  return (
    <>
      <Head>
        <title>
          Авторизация | Zotero MLplatform
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Авторизация
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {/* Don&apos;t have an account?
                &nbsp; */}
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Регистрация
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
            // onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  // error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  // helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  // onBlur={formik.handleBlur}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
                <TextField
                  // error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  // helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  // onBlur={formik.handleBlur}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </Stack>
              {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
              {/* {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )} */}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                onClick={click}
              >
                Войти
              </Button>
              {/* <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button> */}
              {/* <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert> */}
            </form>
            {/* )} */}
            {/* {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
