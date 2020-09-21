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
import { onCheckAction } from '../../storage/actions';

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
          onChange={() => onCheck(id, status)}
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCheck: (id, status) => dispatch(onCheckAction(id, status))
});

export default connect(null, mapDispatchToProps)(Task);
