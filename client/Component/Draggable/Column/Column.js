import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import classes from './Column.css';

const Column = ({ children, status }) => {
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
    <div ref={drop} className={styleColumn}>
      <p>{status}</p>
      {children}
    </div>
  );
};
Column.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.bool.isRequired

};

export default Column;
