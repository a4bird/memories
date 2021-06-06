import { Theme, withStyles } from '@material-ui/core';
import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex'
  },
  closeButton: {
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

export const DialogTitle = withStyles(styles)(
  (props: {
    id: string;
    classes: Record<'root' | 'closeButton', string>;
    children: React.ReactNode;
  }) => {
    const { children, classes, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h3">{children}</Typography>
      </MuiDialogTitle>
    );
  }
);
