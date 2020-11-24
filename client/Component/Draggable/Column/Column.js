import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
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
  children, status, title, onCreate
}) => {
  const [isAddTaskOpen, setisAddTaskOpen] = useState(false);
  const [, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: status }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const styleColumn = classNames({
    [classes.Column]: true,
    [classes.ColumnSecond]: status
  });

  // const getBackgroundColor = () => {
  //   if (isOver) {
  //     if (canDrop) {
  //       return 'rgb(188,251,255)';
  //     } if (!canDrop) {
  //       return 'rgb(255,188,188)';
  //     }
  //   } else {
  //     return '';
  //   }
  // };

  return (
    <div>
      <Typography align="center" component="h6" variant="h5">{title}</Typography>
      <div ref={drop} className={styleColumn}>
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
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default Column;
