import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Typography,
  IconButton
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import classes from './Column.css';
import NewTaskModal from '../../UI/Modal/NewTaskModal/NewTaskModal';

const Column = ({
  children, status, columntitle, dragType
}) => {
  const [isAddTaskOpen, setisAddTaskOpen] = useState(false);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: dragType,
    drop: () => ({ name: status }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const styleColumn = classNames({
    [classes.Column]: true,
    [classes.ColumnDrop]: isOver && canDrop
  });

  return (
    <div>
      <Typography align="center" component="h6" variant="h5">{columntitle}</Typography>
      <div ref={drop} className={styleColumn}>
        {children}
        <IconButton size="small" onClick={() => setisAddTaskOpen(true)}>
          <AddCircleIcon className={classes.AddIcon} fontSize="large" />
          Add task
        </IconButton>
      </div>
      <NewTaskModal
        status={status}
        open={isAddTaskOpen}
        handleClose={() => setisAddTaskOpen(false)}
      />
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  dragType: PropTypes.string.isRequired,
  columntitle: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired
};

export default Column;
