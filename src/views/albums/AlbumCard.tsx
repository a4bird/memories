import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Album } from './types';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

type AlbumCardProps = {
  className: string;
  album: Album;
};

const AlbumCard = ({ className, album, ...rest }: AlbumCardProps) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const albumPath = `${match.url}/${album.title}`;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Link to={albumPath}>
          <Box display="flex" justifyContent="center" mb={3}>
            {/* 
            TODO: Have a collage image as media
            <Avatar alt="Album" src={album.media} variant="square" /> */}
            <Avatar alt="Album" variant="square" />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4">
            {album.title}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {album.description}
          </Typography>
        </Link>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {/* TODO: Total Count {album.totalDownloads} Downloads */}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AlbumCard;
