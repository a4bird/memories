import React, { ChangeEvent, useState } from 'react';
import { Checkbox } from '@material-ui/core';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%'
  },
  checkbox: {
    '&.MuiButtonBase-root': {
      display: 'none',
      position: 'absolute'
    }
  },
  hideCheckbox: {
    '&.MuiButtonBase-root': {
      display: 'none'
    }
  },
  showCheckbox: {
    '&.MuiButtonBase-root': {
      display: 'initial'
    }
  }
}));

type ImageCardProps = {
  url: string;
  handleImageCardSelected: (checked: boolean) => void;
};

const ImageCard = ({ url, handleImageCardSelected }: ImageCardProps) => {
  const classes = useStyles();
  const [isHovered, toggleHover] = useState(false);
  const [isChecked, toggleChecked] = useState(false);

  const handleCheckbox = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    toggleChecked(checked);
    handleImageCardSelected(checked);
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}>
      <Checkbox
        className={`
        ${classes.checkbox}
        ${(isHovered || isChecked) && classes.showCheckbox}`}
        checked={isChecked}
        onChange={handleCheckbox}
        icon={<CircleUnchecked />}
        checkedIcon={<CircleCheckedFilled />}
      />
      <img className={classes.img} alt="complex" src={url} />
    </div>
  );
};

export default ImageCard;
