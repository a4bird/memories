import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DialogTitle, DialogActions } from 'src/components/Dialog';

import { AddAlbumDialogProps } from '../types';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50)
    .required('Album name is required'),
  description: Yup.string()
    .max(255)
    .required('Album description is required')
});

type AddAlbumDialogFormData = {
  albumName: string;
  description: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120
    },
    formControlLabel: {
      marginTop: theme.spacing(1)
    }
  })
);

const AddAlbumDialog = ({
  open,
  handleSave,
  handleClose
}: AddAlbumDialogProps) => {
  const classes = useStyles();

  const { register, formState, errors, handleSubmit } = useForm<
    AddAlbumDialogFormData
  >({
    defaultValues: {
      albumName: '',
      description: ''
    },
    resolver: yupResolver(validationSchema)
  });
  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Album Name</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter Photo Album details</DialogContentText>
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(handleSave)}>
          <TextField
            inputRef={register({ required: 'Album name is Required' })}
            margin="normal"
            name="albumName"
            label="Album name"
            error={!!errors?.albumName?.message}
          />

          <TextField
            inputRef={register({ required: 'Album description' })}
            margin="normal"
            name="description"
            label="Album description"
            error={!!errors?.description?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAlbumDialog;
