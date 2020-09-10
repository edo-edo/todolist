import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Button, TableRow, TableCell, Checkbox, Typography
} from '@material-ui/core';

import classes from './Task.css';

const Task = ({
  id, title, onTitle, onClick, onChecked, onCheckeHandler
}) => {
  const chageCheckboxValue = () => {
    onCheckeHandler(id);
  };

  const styleTitle = classNames(classes.Title, {
    [classes.TitleOverCross]: onChecked
  });

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Checkbox
          checked={onChecked}
          onChange={chageCheckboxValue}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </TableCell>

      <TableCell align="left">
        <Typography onClick={onTitle} component="h2" className={styleTitle}>{title}</Typography>
      </TableCell>

      <TableCell align="left">
        <Button variant="contained" color="secondary" onClick={onClick}>delete</Button>
      </TableCell>

    </TableRow>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onTitle: PropTypes.func.isRequired,
  onChecked: PropTypes.bool.isRequired,
  onCheckeHandler: PropTypes.func.isRequired
};

export default Task;
