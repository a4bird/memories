import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  CardActions,
  IconButton
} from '@material-ui/core';

import UploadAvatarModal from './UploadAvatarModal/UploadAvatarModal';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {}
}));

interface ProfileDetailsProps {
  className?: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const [openUploadPicture, setOpenUploadPicture] = React.useState(false);

  const handleClickOpenUploadPicture = () => {
    setOpenUploadPicture(true);
  };

  const handleCloseUploadPicture = () => {
    setOpenUploadPicture(false);
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}>
      <Card>
        <Box display="flex" justifyContent="space-between" p={2}>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
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
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
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
