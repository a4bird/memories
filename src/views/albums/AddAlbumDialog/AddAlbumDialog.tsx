import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  createStyles,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DialogTitle, DialogActions } from 'src/components/Dialog';

import { AddAlbumDialogProps } from '../types';
import { useAddAlbumMutation } from 'src/graphql/generated/types';
import { toErrorMap } from 'src/utils/toErrorMap';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50)
    .required('Album name is required'),
  description: Yup.string()
    .max(255)
    .required('Album description is required')
});

type AddAlbumDialogFormData = {
  name: string;
  description: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    }
  })
);

const AddAlbumDialog = ({
  open,
  handleSave,
  handleClose
}: AddAlbumDialogProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [addAlbum] = useAddAlbumMutation();

  const { register, formState, errors, handleSubmit } = useForm<
    AddAlbumDialogFormData
  >({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSaveAlbum = async (values: AddAlbumDialogFormData) => {
    const response = await addAlbum({
      variables: {
        title: values.name,
        description: values.description
      }
    });

    if (response.data?.addAlbum?.errors) {
      const errorMapp = toErrorMap(response.data.addAlbum.errors);
      enqueueSnackbar(errorMapp, {
        variant: 'error'
      });
      console.log('Add Album Errors', errorMapp);
    } else if (response.data?.addAlbum?.album) {
      enqueueSnackbar('Album Added!', {
        variant: 'success'
      });
      handleSave(response.data.addAlbum.album);
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <form noValidate onSubmit={handleSubmit(onSaveAlbum)}>
        <DialogTitle id="form-dialog-title">Album Name</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Please enter Photo Album details
          </DialogContentText>
          <TextField
            inputRef={register({ required: 'Album name is Required' })}
            margin="normal"
            name="name"
            label="Album name"
            error={!!errors?.name?.message}
          />

          <TextField
            inputRef={register({ required: 'Album description' })}
            margin="normal"
            name="description"
            label="Album description"
            error={!!errors?.description?.message}
          />
        </DialogContent>
        <DialogActions>
          {formState.isSubmitting ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={formState.isSubmitting}>
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddAlbumDialog;
