import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useLoginMutation } from 'src/graphql/generated/types';
import { toErrorMap } from 'src/utils/toErrorMap';

import { useAuthState, useAuthDispatch, AuthEvent } from 'src/context/Auth';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string()
    .max(255)
    .required('Password is required')
});

type LoginFormData = {
  email: string;
  password: string;
};

const LoginView: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const authState = useAuthState();
  const [login] = useLoginMutation();
  const { formState, control, errors, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: 'ab.1303@gmail.com',
      password: 'test123'
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [authState.isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormData) => {
    const response = await login({
      variables: {
        usernameOrEmail: values.email,
        password: values.password
      }
    });

    if (response.data?.login?.errors) {
      console.log('Login Errors', toErrorMap(response.data.login.errors));
    } else if (response.data?.login?.userAccount) {
      dispatch({
        type: AuthEvent.LOGIN,
        payload: {
          userAccount: response.data?.login?.userAccount
        }
      });
      navigate('/app/dashboard', { replace: true });
    }
  };

  return authState.isAuthenticated ? (
    <div>Loading...</div>
  ) : (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center">
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column">
              <Controller
                name="email"
                as={TextField}
                control={control}
                label="Email Address"
                margin="normal"
                rules={{
                  required: true
                }}
                error={!!errors?.email?.message}
              />
              <Controller
                as={TextField}
                control={control}
                label="Password"
                margin="normal"
                name={'password'}
                rules={{
                  required: true
                }}
                error={!!errors?.password?.message}
              />
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={formState.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained">
                  Sign in now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Don&apos;t have an account?{' '}
                <Link component={RouterLink} to="/register" variant="h6">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
