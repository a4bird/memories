import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactAvatarEditor, { Position } from 'react-avatar-editor';
import InputRange, { Range } from 'react-input-range';
import axios from 'axios';

import 'react-input-range/lib/css/index.css';

import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { useS3PutPreSignedUrlMutation } from 'src/graphql/generated/types';
import { ProfileEvent, useAuthDispatch } from 'src/context/Auth';
import {
  DialogTitle,
  DialogActions,
  DialogContent
} from 'src/components/Dialog';

const avatarModalStyles = makeStyles(() => ({
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
  },
  avatarEditor: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatarEditorBg: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    backgroundImage: `linear-gradient(45deg, #a3a9ad 25%, transparent 25%),
    linear-gradient(-45deg, #a3a9ad 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #a3a9ad 75%),
    linear-gradient(-45deg, transparent 75%, #a3a9ad 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  },
  avatarEditorClose: {
    position: 'absolute',
    right: '5px',
    color: 'white'
  },
  avatarSliderShell: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '5px'
  }
}));

export default function UploadAvatarModal({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const mime = 'image/jpg';
  const dispatch = useAuthDispatch();
  const [avatar, setAvatar] = useState<{
    file: unknown;
    preview: string;
  } | null>(null);

  const [imageDataUrl, setImageDataUrl] = useState<string>();
  const [scale, setScale] = useState<number | Range>(1);
  const [position, setPosition] = useState<Position>();
  const editorRef = useRef<ReactAvatarEditor>(null);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const image = {
      file,
      preview: URL.createObjectURL(file)
    };
    setAvatar(image);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  const classes: Record<
    | 'root'
    | 'dropZone'
    | 'avatarEditor'
    | 'avatarEditorBg'
    | 'avatarEditorClose'
    | 'avatarSliderShell',
    string
  > = avatarModalStyles();
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

  const [mutate, { loading, error }] = useS3PutPreSignedUrlMutation({
    onCompleted(data) {
      const signedRequest = data.s3PutPreSignedUrl.signedRequest;

      dispatch({
        type: ProfileEvent.CHANGE_AVATAR,
        payload: {
          avatar: imageDataUrl!
        }
      });

      const blobBin = atob(imageDataUrl!.split(',')[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: mime });

      const options = {
        headers: {
          'Content-Type': file.type
        }
      };
      axios.put(signedRequest, file, options);

      handleClose();
    }
  });

  const uploadPhoto = async () => {
    if (editorRef.current == null) return;
    const canvas = editorRef.current.getImageScaledToCanvas();

    const dataURL = canvas.toDataURL(mime);
    setImageDataUrl(dataURL);

    mutate({
      variables: {
        filename: 'profile-pic',
        filetype: mime
      }
    });
  };

  if (loading) return <div>UpLoading file...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle id="customized-dialog-title">
        Upload Profile Picture
      </DialogTitle>
      <DialogContent dividers>
        {avatar === null ? (
          <div className={classes.root}>
            <div
              className={classes.dropZone}
              style={styles}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div style={{ textAlign: 'center' }}>
                {' '}
                {isDragAccept ? 'Drop' : 'Drag'} your photo here or click to
                browse image for upload...
              </div>
              {isDragReject && <div>Unsupported file type...</div>}
            </div>
          </div>
        ) : (
          <div className={classes.avatarEditor}>
            <div className={classes.avatarEditorBg}>
              <ReactAvatarEditor
                width={256}
                height={256}
                ref={editorRef}
                image={avatar.preview}
                position={position}
                scale={typeof scale === 'object' ? scale.max : scale}
                onPositionChange={position => setPosition(position)}
              />
              <span className={classes.avatarEditorClose}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <CancelIcon
                    fontSize="small"
                    onClick={() => setAvatar(null)}
                    role="button"
                    tabIndex={0}
                  />
                )}
              </span>
            </div>
            <div className={classes.avatarSliderShell}>
              <span style={{ marginRight: '10px' }}>
                <ImageIcon fontSize="small" />
              </span>
              <InputRange
                formatLabel={() => ''}
                maxValue={5}
                minValue={1}
                step={0.1}
                value={scale}
                onChange={value => setScale(value)}
              />
              <span style={{ marginLeft: '10px' }}>
                <ImageIcon fontSize="large" />
              </span>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={uploadPhoto} color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
