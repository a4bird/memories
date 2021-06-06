import React, { useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import AlbumCard from './AlbumCard';
import data from './data';
import { Album } from './types';
import AddAlbumDialog from './AddAlbumDialog/AddAlbumDialog';

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
  const [albums] = useState<Album[]>(data);
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
            {albums.map(album => (
              <Grid item key={album.id} lg={4} md={6} xs={12}>
                <AlbumCard className={classes.albumCard} album={album} />
              </Grid>
            ))}
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
