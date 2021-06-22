import React, { useState, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Dialog,
  DialogContent,
  Button
} from '@material-ui/core';
import { Dashboard, useUppy } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { AddPhotoDialogProps, Photo } from '../types';
import { useSnackbar } from 'notistack';
import { Uppy } from '@uppy/core';
import { usePhotoPutPreSignedUrlMutation } from 'src/graphql/generated/types';

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    }
  })
);

const AddPhotosDialog = ({
  albumId,
  open,
  handleClose
}: AddPhotoDialogProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [successfulPhotoUploads, setSuccessfulPhotoUploads] = useState<Photo[]>(
    []
  );
  const [mutate, { error }] = usePhotoPutPreSignedUrlMutation();

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error fetching signed Url to upload file', {
        variant: 'error'
      });
      return;
    }
  }, [error, enqueueSnackbar]);

  let photoUploads: Photo[] = [];

  const addPhotosUppy = useUppy(() => {
    return new Uppy({
      restrictions: {
        maxFileSize: 1024 * 1024 * 5,
        maxNumberOfFiles: 10,
        allowedFileTypes: ['image/*']
      }
    })
      .use(AwsS3, {
        metaFields: ['name'],
        getUploadParameters(file) {
          return mutate({
            variables: {
              albumId: albumId,
              filename: file.name,
              filetype: file.type!
            }
          })
            .then(response => response.data?.photoPutPreSignedUrl)
            .then(signedResponse => {
              if (!signedResponse) {
                enqueueSnackbar(
                  'Unexpected error in response for fetching signed Url to upload file',
                  {
                    variant: 'error'
                  }
                );
                return;
              }

              photoUploads = [
                ...photoUploads,
                {
                  filename: file.name,
                  createdAt: new Date().toJSON(),
                  url: signedResponse.url
                }
              ];
              return {
                method: 'PUT',
                url: signedResponse.signedRequest,
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
        const successfulPhotoUploads = result.successful.map(successResult => {
          const successfulPhotoUpload = photoUploads.find(
            photo => photo.filename === successResult.name
          );
          if (!successfulPhotoUpload)
            return {
              createdAt: new Date().toJSON,
              filename: successResult.name,
              url: successResult.uploadURL
            };
          return successfulPhotoUpload;
        });
        setSuccessfulPhotoUploads(successfulPhotoUploads);
        console.info('successful photo uploads', successfulPhotoUploads);
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
      onClose={() => handleClose(successfulPhotoUploads)}
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
        <Button
          autoFocus
          onClick={() => handleClose(successfulPhotoUploads)}
          color="secondary">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhotosDialog;
