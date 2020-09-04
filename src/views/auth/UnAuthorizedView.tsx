import React from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UnAuthorizedView: React.FC = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="UnAuthorized">
      <div>You are not authorized to view this page</div>
    </Page>
  );
};

export default UnAuthorizedView;
