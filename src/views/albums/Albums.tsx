import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import AlbumCard from './AlbumCard';
import data from './data';
import { Album, AlbumData } from './types';
import AddAlbumDialog from './AddAlbumDialog/AddAlbumDialog';
import { useGetAlbumsQuery } from 'src/graphql/generated/types';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  albumCard: {
    height: '100%'
  },
  toolbar: {}
}));

const Albums = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const [albums, setAlbums] = useState<AlbumData[]>(data);
  const [albums, setAlbums] = useState<Album[]>();

  const {
    loading: getAlbumsLoading,
    error: getAlbumsError,
    data: getAlbumsData
  } = useGetAlbumsQuery();

  useEffect(() => {
    if (getAlbumsError) {
      enqueueSnackbar(getAlbumsError, {
        variant: 'error'
      });
      return;
    }

    if (getAlbumsData?.getAlbums?.albums) {
      setAlbums(getAlbumsData.getAlbums.albums);
    }
  }, [getAlbumsError, getAlbumsData, enqueueSnackbar]);

  const [openAddAlbumDialog, setOpenAddAlbumDialog] = React.useState<boolean>(
    false
  );

  return (
    <Page className={classes.root} title="Albums">
      <Container maxWidth={false}>
        <Toolbar
          className={classes.toolbar}
          handleAddAlbumAction={() => setOpenAddAlbumDialog(true)}
        />
        <Box mt={3}>
          <Grid container spacing={3}>
            {getAlbumsLoading ? (
              <span>Loading...</span>
            ) : (
              albums &&
              albums.map(album => (
                <Grid item key={album.id} lg={4} md={6} xs={12}>
                  <AlbumCard className={classes.albumCard} album={album} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
        <AddAlbumDialog
          open={openAddAlbumDialog}
          handleSave={() => setOpenAddAlbumDialog(false)}
          handleClose={() => setOpenAddAlbumDialog(false)}
        />
      </Container>
    </Page>
  );
};

export default Albums;
