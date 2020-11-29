import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, IconButton } from '@material-ui/core';

import classes from './Item.css';

const Item = ({
  reference, title, onDelete, onClick, currentColumnName
}) => {
  const styleItem = classNames({
    [classes.Item]: true,
    [classes.ItemSecondColimn]: currentColumnName,
  });

  return (
    <div ref={reference} className={styleItem}>
      <Typography onClick={onClick} component="h2">{title}</Typography>
      <IconButton onClick={onDelete} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  currentColumnName: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  reference: PropTypes.oneOfType([PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};

export default Item;
