import React from 'react';
import { withStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';

export const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: 500,
    width: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))(MuiDialogContent);
