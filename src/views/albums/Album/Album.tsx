import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  makeStyles,
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Breadcrumbs,
  Typography,
  Link
} from '@material-ui/core';

import Page from 'src/components/Page';
import { Photo, useGetAlbumQuery } from 'src/graphql/generated/types';
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
  photoCard: {},
  toolbar: {
    marginBottom: 15
  }
}));

export const Album = () => {
  const classes = useStyles();
  const { albumId } = useParams<{
    albumId: string;
  }>();
  const { path } = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openAddPhotosDialog, setOpenAddPhotosDialog] = React.useState<boolean>(
    false
  );

  const [albumDetails, setAlbumDetails] = React.useState<AlbumType>({
    id: +albumId,
    description: '',
    title: '',
    createdAt: ''
  });

  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

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

  console.info('Selected Photos', selectedPhotos);

  return (
    <Page className={classes.root} title={`${albumDetails?.title || 'Album'}`}>
      <Container maxWidth={false}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to={`/app/albums`}>
            Albums
          </Link>
          <Typography color="textPrimary">
            {`${albumDetails?.title || 'Album'}`}
          </Typography>
        </Breadcrumbs>
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
              {albumDetails?.photos && (
                <Grid container spacing={3}>
                  {albumDetails.photos.map(photo => (
                    <Grid item key={photo.filename} lg={4} md={6} xs={12}>
                      <PhotoCard
                        className={classes.photoCard}
                        photo={photo}
                        handlePhotoCardSelected={(photo, isChecked) => {
                          console.info(
                            `Photo: ${JSON.stringify(
                              photo
                            )}, isChecked ${isChecked}`
                          );
                          if (isChecked) {
                            setSelectedPhotos([...selectedPhotos, photo]);
                            return;
                          }
                          setSelectedPhotos(
                            selectedPhotos.filter(
                              prevPhoto => prevPhoto.filename !== photo.filename
                            )
                          );
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {/* <Grid container spacing={3}>
                {albumDetails?.photos &&
                  albumDetails.photos.map(photo => (
                    <Grid item key={photo.filename} lg={3} md={6} xs={12}>
                      <PhotoCard
                        className={classes.photoCard}
                        photo={photo}
                        handlePhotoCardSelected={(photo, isChecked) => {
                          console.info(
                            `Photo: ${JSON.stringify(
                              photo
                            )}, isChecked ${isChecked}`
                          );
                          if (isChecked) {
                            setSelectedPhotos([...selectedPhotos, photo]);
                            return;
                          }
                          setSelectedPhotos(
                            selectedPhotos.filter(
                              prevPhoto => prevPhoto.filename !== photo.filename
                            )
                          );
                        }}
                      />
                    </Grid>
                  ))}
              </Grid> */}
            </CardContent>
          </Card>
        )}

        {albumDetails && openAddPhotosDialog && (
          <AddPhotosDialog
            albumId={albumDetails.id}
            open={openAddPhotosDialog}
            handleClose={successfulUploadedPhotos => {
              setAlbumDetails(prevAlbumDetails => {
                const previouslyUploadedPhotos = prevAlbumDetails.photos
                  ? prevAlbumDetails.photos
                  : [];
                return {
                  ...prevAlbumDetails,
                  photos: [
                    ...previouslyUploadedPhotos,
                    ...successfulUploadedPhotos
                  ]
                };
              });
              setOpenAddPhotosDialog(false);
            }}
          />
        )}
      </Container>
    </Page>
  );
};
