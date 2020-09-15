import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  Button,
  TableRow,
  TableCell,
  Checkbox,
  Typography
} from '@material-ui/core';

import classes from './Task.css';
import * as actionTypes from '../../storage/constant';

const Task = ({
  id, title, onTitle, onClick, status, onCheck
}) => {
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
          onChange={() => onCheck(id)}
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
  onCheck: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCheck: id => dispatch({ type: actionTypes.ON_CHECK, payload: { id } })
});

export default connect(null, mapDispatchToProps)(Task);
