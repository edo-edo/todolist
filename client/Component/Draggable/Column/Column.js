import React from 'react';
import { useDrop } from 'react-dnd';

import classes from './Column.css';

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
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
  };

  return (
    <div ref={drop} className={classes.Column} style={{ backgroundColor: getBackgroundColor() }}>
      <p>{title}</p>
      {children}
    </div>
  );
};

export default Column;
