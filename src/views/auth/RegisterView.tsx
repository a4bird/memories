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
    .required('password is required')
  // policy: Yup.boolean().oneOf([true], 'This field must be checked')
});

const RegisterView: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const { formState, control, errors, handleSubmit } = useForm<
    RegisterFormData
  >({
    defaultValues: {
      email: '',
      password: '',
      policy: false
    },
    resolver: yupResolver(validationSchema)
  });

  const onSave = async (formData: RegisterFormData) => {
    console.log('On Save register', formData);
    return;
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
              <Controller
                as={TextField}
                control={control}
                label="Email Address"
                margin="normal"
                name="email"
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
                name="password"
                rules={{
                  required: true
                }}
                error={!!errors?.password?.message}
              />
              <Box alignItems="center" display="flex" ml={-1}>
                <Controller
                  as={<Checkbox />}
                  name="policy"
                  type="checkbox"
                  control={control}
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
