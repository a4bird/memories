import React from 'react';
import {
  Link as RouterLink,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const authState = useAuthState();
  const [login] = useLoginMutation();
  const { formState, control, errors, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: 'ab.1303@gmail.com',
      password: 'test@1234'
    },
    resolver: yupResolver(validationSchema)
  });

  const location = useLocation();

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
      const { userAccount } = response.data.login;
      dispatch({
        type: AuthEvent.LOGIN,
        payload: {
          userAccount: {
            id: userAccount.id,
            email: userAccount.email,
            profile: {
              firstName: userAccount.profile?.firstName,
              lastName: userAccount.profile?.lastName
            }
          }
        }
      });
      history.push('/app/dashboard', { replace: true });
    }
  };

  if (authState.isAuthenticated) {
    return <Redirect to={location.state?.from || '/app/dashboard'} />;
  }

  return (
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
