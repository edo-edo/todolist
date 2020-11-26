import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import Item from './Item/Item';
import * as actionTypes from '../../../storage/constant';

const MovableItem = ({
  name,
  id,
  index,
  currentColumnName,
  moveCardHandler,
  onCheck,
  onDelete,
  onClick,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex, currentColumnName, id);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      index, name, id, currentColumnName, type: 'Our first type'
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        if (dropResult.name) {
          if (!item.currentColumnName) {
            onCheck(id, false);
          } else {
            console.log('vertical');
          }
        } else if (item.currentColumnName) {
          onCheck(id, true);
        } else {
          console.log('vertical');
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <Item
      reference={ref}
      opacity={opacity}
      name={name}
      id={id}
      onDelete={onDelete}
      onClick={onClick}
    />
  );
};
const mapDispatchToProps = dispatch => ({
  onCheck: (id, status) => dispatch({ type: actionTypes.ON_CHECK_START, payload: { id, status } })
});

export default connect(null, mapDispatchToProps)(MovableItem);
