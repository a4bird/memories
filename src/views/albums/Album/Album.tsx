import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  makeStyles,
  CircularProgress,
  Typography
} from '@material-ui/core';

import Page from 'src/components/Page';
import { useGetAlbumQuery } from 'src/graphql/generated/types';
import { Album as AlbumType } from '../types';
import AddPhotosDialog from './AddPhotosDialog';
import Toolbar from './Toolbar';
import { useSnackbar } from 'notistack';

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
  toolbar: {}
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
    <Page className={classes.root} title="Album">
      <Container maxWidth={false}>
        <Toolbar
          className={classes.toolbar}
          handleAddPhotosAction={() => setOpenAddPhotosDialog(true)}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h4">
            {`Photo Album - ${albumDetails?.title}`}
          </Typography>
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
