import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import classes from './Column.css';
import NewTaskModal from '../../UI/Modal/NewTaskModal/NewTaskModal';

const Column = ({
  children, status, columntitle
}) => {
  const [isAddTaskOpen, setisAddTaskOpen] = useState(false);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: status }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(188,251,255)';
      } if (!canDrop) {
        return 'rgb(255,188,188)';
      }
    } else {
      return '';
    }
    return '';
  };

  return (
    <div>
      <Typography align="center" component="h6" variant="h5">{columntitle}</Typography>
      <div ref={drop} className={classes.Column} style={{ backgroundColor: getBackgroundColor() }}>
        {children}
        <ListItem button onClick={() => setisAddTaskOpen(true)}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add task" />
        </ListItem>
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
  columntitle: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired
};

export default Column;
