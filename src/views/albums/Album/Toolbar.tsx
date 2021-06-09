import React from 'react';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  photosButton: {
    marginRight: theme.spacing(1)
  }
}));

type ToolbarProps = {
  className: string;
  handleAddPhotosAction: () => void;
};

const Toolbar = ({
  className,
  handleAddPhotosAction,
  ...rest
}: ToolbarProps) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          className={classes.photosButton}
          color="primary"
          variant="contained"
          onClick={handleAddPhotosAction}>
          Add Photos
        </Button>
      </Box>
    </div>
  );
};

export default Toolbar;
