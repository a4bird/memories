import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex'
  },
  closeButton: {
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(
  (props: {
    id: string;
    classes: Record<'root' | 'closeButton', string>;
    children: React.ReactNode;
  }) => {
    const { children, classes, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h3">{children}</Typography>
      </MuiDialogTitle>
    );
  }
);

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: 500,
    width: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const avatarModalStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  dropZone: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#757e84',
    borderStyle: 'dashed',
    borderRadius: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function UploadAvatarModal({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const classes: Record<'root' | 'dropZone', string> = avatarModalStyles();
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  let styles = {};
  if (isDragActive) {
    styles = {
      borderStyle: 'solid',
      borderColor: '#6c6',
      backgroundColor: '#eee'
    };
  } else if (isDragReject) {
    styles = {
      borderStyle: 'solid',
      borderColor: '#c66',
      backgroundColor: '#eee'
    };
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle id="customized-dialog-title">
        Upload Profile Picture
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <div className={classes.dropZone} style={styles} {...getRootProps()}>
            <input {...getInputProps()} />
            <div style={{ textAlign: 'center' }}>
              {' '}
              {isDragAccept ? 'Drop' : 'Drag'} your photo here or click to
              browse image for upload...
            </div>
            {isDragReject && <div>Unsupported file type...</div>}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
