import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

import { useRegisterMutation } from 'src/graphql/generated/types';
import { toErrorMap } from 'src/utils/toErrorMap';

import Page from 'src/components/Page';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

type RegisterFormData = {
  email: string;
  password: string;
  policy: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string()
    .max(255)
    .required('password is required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked')
});

const RegisterView: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const { register, formState, control, errors, handleSubmit } = useForm<
    RegisterFormData
  >({
    defaultValues: {
      email: '',
      password: '',
      policy: false,
      Checkbox: false
    },
    resolver: yupResolver(validationSchema)
  });

  const onSave = async (values: RegisterFormData) => {
    const response = await registerUser({
      variables: {
        usernameOrEmail: values.email,
        password: values.password
      }
    });

    if (response.data?.register?.errors) {
      console.log('Register Errors', toErrorMap(response.data.register.errors));
    } else if (response.data?.register?.userAccount) {
      navigate('/app/login', { replace: true });
    }
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center">
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSave)}>
            <Box display="flex" flexDirection="column">
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use your email to create new account
                </Typography>
              </Box>
              <TextField
                inputRef={register({ required: 'Email Address Required' })}
                margin="normal"
                name="email"
                label="Email Address"
                error={!!errors?.email?.message}
              />

              <TextField
                inputRef={register({ required: 'Password Required' })}
                label="Password"
                margin="normal"
                name="password"
                error={!!errors?.email?.message}
              />

              <Box alignItems="center" display="flex" ml={-1}>
                <Controller
                  control={control}
                  name="policy"
                  render={({ onChange, onBlur, value, name }) => (
                    <Checkbox
                      onBlur={onBlur}
                      onChange={e => onChange(e.target.checked)}
                      checked={value}
                      name={name}
                    />
                  )}
                />
                <Typography color="textSecondary" variant="body1">
                  I have read the{' '}
                  <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="h6">
                    Terms and Conditions
                  </Link>
                </Typography>
              </Box>
              {Boolean(errors && errors?.policy?.message) && (
                <FormHelperText error>{errors?.policy?.message}</FormHelperText>
              )}
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={formState.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained">
                  Sign up now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Have an account?{' '}
                <Link component={RouterLink} to="/login" variant="h6">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
