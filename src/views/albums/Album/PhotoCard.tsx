import React from 'react';
import clsx from 'clsx';

import { Card, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Photo } from '../types';
import ImageCard from './ImageCard';

const useStyles = makeStyles(theme => ({
  image: {
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: '300px',
    width: '300px'
  },
  photoItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '&:hover $photoItemOverlay': {
      opacity: 1
    }
  },
  photoItemOverlay: {
    content: '""',
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '80px',
    background: 'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 100%)',
    transition: 'opacity .2s',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px',
    opacity: 0,
    zIndex: 1,
    color: '#e8e8e8',
    padding: '10px'
  },
  photoItemName: {
    boxSizing: 'content-box',
    maxWidth: 'calc(100% - 40px)',
    marginRight: '40px',
    marginLeft: '5px',
    display: 'inline-block',
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

type PhotoCardProps = {
  className: string;
  photo: Photo;
  handlePhotoCardSelected: (photo: Photo, isChecked: boolean) => void;
};

const PhotoCard = ({
  className,
  photo,
  handlePhotoCardSelected,
  ...rest
}: PhotoCardProps) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.photoItem, className)} {...rest}>
      <ImageCard
        url={photo.url}
        handleImageCardSelected={isChecked =>
          handlePhotoCardSelected(photo, isChecked)
        }
      />
      <Divider />
      <Grid
        className={classes.photoItemOverlay}
        container
        justify="space-between"
        alignItems="flex-end">
        <Grid item>
          <Typography
            className={classes.photoItemName}
            gutterBottom
            variant="h6">
            {photo.filename}
          </Typography>
        </Grid>
        <Grid item>
          <GetAppIcon className={classes.statsIcon} color="inherit" />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PhotoCard;
