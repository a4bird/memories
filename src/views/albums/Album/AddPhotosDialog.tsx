import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  createStyles,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { Dashboard, useUppy } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { DialogTitle } from 'src/components/Dialog';

import { AddAlbumDialogProps } from '../types';
import { useSnackbar } from 'notistack';
import { Uppy } from '@uppy/core';
import { useS3PutPreSignedUrlMutation } from 'src/graphql/generated/types';

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    }
  })
);

const AddPhotosDialog = ({ open, handleClose }: AddAlbumDialogProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [mutate, { loading, error }] = useS3PutPreSignedUrlMutation();

  const addPhotosUppy = useUppy(() => {
    return new Uppy()
      .use(AwsS3, {
        getUploadParameters(file) {
          return mutate({
            variables: {
              filename: `timesheets/${file.name}`,
              filetype: file.type!
            }
          })
            .then(response => response.data?.s3PutPreSignedUrl)
            .then(signedResponse => {
              return {
                method: 'PUT',
                url: signedResponse?.signedRequest,
                fields: [],
                headers: {
                  'Content-Type': file.type
                }
              };
            });
        }
      })
      .on('file-added', file => {
        console.log('Added file', file);
      })
      .on('upload-error', (file, error) => {
        console.log('error with file:', file.id);
        console.log('error message:', error);
      })
      .on('complete', result => {
        const url = result.successful[0].uploadURL;
        console.info('Upload complete on url!', url);
      });
  });

  React.useEffect(() => {
    return () => addPhotosUppy.close();
  }, [addPhotosUppy]);

  const localeStrings = {
    dropPasteFiles: 'Drag & drop or %{browse} file(s) to upload'
  };
  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogContent className={classes.dialogContent}>
        <Dashboard
          id="fileUploadDashboard"
          closeModalOnClickOutside
          height={570}
          proudlyDisplayPoweredByUppy={false}
          note="Maximum file upload size is 5 MB"
          uppy={addPhotosUppy}
          locale={{
            strings: localeStrings
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPhotosDialog;
