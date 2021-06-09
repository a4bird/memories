import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import Page from 'src/components/Page';
import AddPhotosDialog from './AddPhotosDialog';
import Toolbar from './Toolbar';

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

  const [openAddPhotosDialog, setOpenAddPhotosDialog] = React.useState<boolean>(
    false
  );

  return (
    <Page className={classes.root} title="Album">
      <Container maxWidth={false}>
        <Toolbar
          className={classes.toolbar}
          handleAddPhotosAction={() => setOpenAddPhotosDialog(true)}
        />
        <div>Photo Album - {albumId}</div>

        <AddPhotosDialog
          open={openAddPhotosDialog}
          handleSave={() => setOpenAddPhotosDialog(false)}
          handleClose={() => setOpenAddPhotosDialog(false)}
        />
      </Container>
    </Page>
  );
};
