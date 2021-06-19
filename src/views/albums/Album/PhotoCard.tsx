import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  ButtonBase
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Photo } from '../types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

type PhotoCardProps = {
  className: string;
  photo: Photo;
};

const PhotoCard = ({ className, photo, ...rest }: PhotoCardProps) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <img className={classes.img} alt="complex" src={photo.url} />
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} color="action" />
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h6">
              {photo.filename}
            </Typography>
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"></Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PhotoCard;
