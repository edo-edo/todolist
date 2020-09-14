import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Button,
  TableRow,
  TableCell,
  Checkbox,
  Typography
} from '@material-ui/core';

import classes from './Task.css';
import TaskContext from '../../storage/TaskContext';
import actionTypes from '../../storage/actions';

const Task = ({
  id, title, onTitle, onClick, status
}) => {
  const { dispatch } = useContext(TaskContext);

  const styleTitle = classNames(classes.Title, {
    [classes.TitleOverCross]: status
  });

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Checkbox
          checked={status}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          onChange={() => dispatch({ type: actionTypes.ON_CHECK, id })}
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
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onTitle: PropTypes.func.isRequired,
};

export default Task;
