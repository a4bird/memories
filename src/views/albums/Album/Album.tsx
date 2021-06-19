import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  makeStyles,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent
} from '@material-ui/core';

import Page from 'src/components/Page';
import { useGetAlbumQuery } from 'src/graphql/generated/types';
import { Album as AlbumType } from '../types';
import AddPhotosDialog from './AddPhotosDialog';
import Toolbar from './Toolbar';
import { useSnackbar } from 'notistack';
import PhotoCard from './PhotoCard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  photoCard: {
    height: '100%'
  },
  toolbar: {
    marginBottom: 15
  }
}));

export const Album = () => {
  const classes = useStyles();
  const { albumId } = useParams<{
    albumId: string;
  }>();

  const { enqueueSnackbar } = useSnackbar();
  const [openAddPhotosDialog, setOpenAddPhotosDialog] = React.useState<boolean>(
    false
  );

  const [albumDetails, setAlbumDetails] = React.useState<AlbumType>();

  const { loading, error, data } = useGetAlbumQuery({
    variables: {
      id: +albumId
    }
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error fetching album details', {
        variant: 'error'
      });
    }

    if (data?.getAlbum?.album) {
      setAlbumDetails(data.getAlbum.album);
    }
  }, [data, error, enqueueSnackbar]);

  return (
    <Page className={classes.root} title={`${albumDetails?.title || 'Album'}`}>
      <Container maxWidth={false}>
        <Toolbar
          className={classes.toolbar}
          handleAddPhotosAction={() => setOpenAddPhotosDialog(true)}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Card>
            <CardHeader title={`Photo Album - ${albumDetails?.title}`} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {albumDetails?.photos &&
                  albumDetails.photos.map(photo => (
                    <Grid item key={photo.filename} lg={4} md={6} xs={12}>
                      <PhotoCard className={classes.photoCard} photo={photo} />
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {albumDetails && (
          <AddPhotosDialog
            albumId={albumDetails.id}
            open={openAddPhotosDialog}
            handleSave={() => setOpenAddPhotosDialog(false)}
            handleClose={() => setOpenAddPhotosDialog(false)}
          />
        )}
      </Container>
    </Page>
  );
};
