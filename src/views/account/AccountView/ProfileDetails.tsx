import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Select,
  makeStyles,
  CardActions,
  IconButton,
  MenuItem,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

import {
  useSaveProfileMutation,
  useGetUserProfileQuery
} from 'src/graphql/generated/types';
import { toErrorMap } from 'src/utils/toErrorMap';

import { Controller, useForm } from 'react-hook-form';

import UploadAvatarModal from './UploadAvatarModal/UploadAvatarModal';
import { Gender } from 'src/graphql/generated/types';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {}
}));

interface ProfileDetailsProps {
  className?: string;
}

type ProfileDetailsFormData = {
  firstName: string;
  lastName: string;
  gender?: Gender;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255)
    .required('first name is required'),
  lastName: Yup.string()
    .max(255)
    .required('last name is required'),
  gender: Yup.mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required('gender is required')
});

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();

  const [saveProfile] = useSaveProfileMutation();
  const {
    loading: userProfileLoading,
    error: userProfileError,
    data: userProfileData
  } = useGetUserProfileQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { reset, control, formState, errors, handleSubmit } = useForm<
    ProfileDetailsFormData
  >({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: undefined
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (userProfileError) {
      enqueueSnackbar(userProfileError, {
        variant: 'error'
      });
      return;
    }

    if (userProfileData?.getUserProfile?.userProfile) {
      reset({
        ...userProfileData.getUserProfile.userProfile
      });
    }
  }, [userProfileError, userProfileData, enqueueSnackbar, reset]);

  const [openUploadPicture, setOpenUploadPicture] = React.useState(false);

  const handleClickOpenUploadPicture = () => {
    setOpenUploadPicture(true);
  };

  const handleCloseUploadPicture = () => {
    setOpenUploadPicture(false);
  };

  const onSaveProfile = async (values: ProfileDetailsFormData) => {
    const response = await saveProfile({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender!
      }
    });

    if (response.data?.saveProfile?.errors) {
      const errorMapp = toErrorMap(response.data.saveProfile.errors);
      enqueueSnackbar(errorMapp, {
        variant: 'error'
      });

      console.log('Profile Errors', errorMapp);
    }

    enqueueSnackbar('Profile saved!', {
      variant: 'success'
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit(onSaveProfile)}
      {...rest}>
      <Card>
        <Box display="flex" justifyContent="space-between" p={2}>
          <CardHeader
            subheader="The information can be edited"
            title="Account Profile"
          />
          <CardActions>
            <IconButton
              onClick={handleClickOpenUploadPicture}
              color="primary"
              aria-label="upload picture"
              component="span">
              <PhotoCamera />
            </IconButton>
          </CardActions>
        </Box>

        <Divider />
        <CardContent>
          {userProfileLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  margin="normal"
                  variant="outlined"
                  rules={{
                    required: true
                  }}
                  error={!!errors?.firstName?.message}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Last name"
                  name="lastName"
                  margin="normal"
                  variant="outlined"
                  rules={{
                    required: true
                  }}
                  error={!!errors?.lastName?.message}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Box display="flex" flexDirection="column">
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="gender"
                    rules={{ required: true }}
                    error={!!errors?.gender?.message}
                    as={
                      <Select id="trinity-select">
                        {Object.values(Gender).map(gender => {
                          return (
                            <MenuItem key={gender} value={gender}>
                              {gender}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          {formState.isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formState.isSubmitting}>
              Save details
            </Button>
          )}
        </Box>
      </Card>
      {openUploadPicture && (
        <UploadAvatarModal
          open={openUploadPicture}
          handleClose={handleCloseUploadPicture}
        />
      )}
    </form>
  );
};

export default ProfileDetails;
