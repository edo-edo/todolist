import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';

import classes from './Item.css';

const Item = ({
  reference, opacity, name, id, onDelete, onClick
}) => (
  <div ref={reference} className={classes.Item} style={{ opacity }}>
    <Typography onClick={onClick} component="h2">{name}</Typography>
    <IconButton onClick={onDelete} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  </div>
);
export default Item;
