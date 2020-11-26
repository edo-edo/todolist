import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, IconButton } from '@material-ui/core';

import classes from './Item.css';

const Item = ({
  reference, opacity, title, onDelete, onClick
}) => (
  <div ref={reference} className={classes.Item} style={{ opacity }}>
    <Typography onClick={onClick} component="h2">{title}</Typography>
    <IconButton onClick={onDelete} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  </div>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  reference: PropTypes.oneOfType([PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};

export default Item;
