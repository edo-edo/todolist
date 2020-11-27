import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Item from './Item/Item';
import * as actionTypes from '../../../storage/constant';

const MovableItem = ({
  title,
  id,
  index,
  currentColumnName,
  moveCardHandler,
  onCheck,
  onDelete,
  onClick,
  dragType
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: dragType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

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
      moveCardHandler(item.id, id);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    item: {
      index, id, currentColumnName, type: dragType
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        if (dropResult.name && !item.currentColumnName) {
          onCheck(id, false);
        } else if (!dropResult.name && item.currentColumnName) {
          onCheck(id, true);
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Item
      currentColumnName={currentColumnName}
      reference={ref}
      title={title}
      id={id}
      onDelete={onDelete}
      onClick={onClick}
    />
  );
};

MovableItem.propTypes = {
  dragType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentColumnName: PropTypes.bool.isRequired,
  moveCardHandler: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onCheck: (id, status) => dispatch({ type: actionTypes.ON_CHECK_START, payload: { id, status } })
});

export default connect(null, mapDispatchToProps)(MovableItem);
