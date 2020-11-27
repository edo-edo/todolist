import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classes from './Tasks.css';
import DeleteModal from '../Component/UI/Modal/DeleteModal/DeleteModal';
import DetailTaskModal from '../Component/UI/Modal/DetailTaskModal/DetailTaskModal';
import ErrorModal from '../Component/UI/Modal/ErrorModal/ErrorModal';
import * as actionTypes from '../storage/constant';
import Spinner from '../Component/UI/Spinner/Spinner';
import Column from '../Component/Draggable/Column/Column';
import MovableItem from '../Component/Draggable/MovableItem/MovableItem';

const Tasks = ({
  tasks, loading, fetchTasks, error, fetchTask, setTasks
}) => {
  useEffect(() => {
    fetchTasks();
  }, []);

  const [isDeleteOpen, setisDeleteOpen] = useState({
    status: false,
    id: ''
  });
  const [isDetailOpen, setisDetailOpen] = useState(false);

  const dragType = 'Drag type';

  if (loading) {
    return <Spinner />;
  }

  const moveCardHandler = (firstId, secondId) => {
    const prevTasks = [...tasks];
    const dragTask = prevTasks.find(task => task._id === firstId);
    const hoverTask = prevTasks.find(task => task._id === secondId);

    const dragArrayIndex = prevTasks.indexOf(dragTask);
    const hoverArrayIndex = prevTasks.indexOf(hoverTask);
    prevTasks[dragArrayIndex] = hoverTask;
    prevTasks[hoverArrayIndex] = dragTask;
    setTasks(prevTasks);
  };

  const returnItemsForColumn = columnName => tasks
    .filter(task => task.status === columnName)
    .map((task, index) => (
      <MovableItem
        dragType={dragType}
        key={task._id}
        id={task._id}
        title={task.title}
        onDelete={() => setisDeleteOpen({ status: true, id: task._id })}
        onClick={() => {
          fetchTask(task._id);
          setisDetailOpen(true);
        }}
        currentColumnName={task.status}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ));

  return (
    <div className={classes.Tasks}>
      {
        error.length !== 0 && (
          <ErrorModal message={error} />
        )
      }
      <DndProvider backend={HTML5Backend}>
        <Column status={false} columntitle="Do it" dragType={dragType}>
          {returnItemsForColumn(false)}
        </Column>

        <Column status columntitle="Done" dragType={dragType}>
          {returnItemsForColumn(true)}
        </Column>
      </DndProvider>
      <DetailTaskModal open={isDetailOpen} handleClose={() => setisDetailOpen(false)} />
      <DeleteModal open={isDeleteOpen} handleClose={() => setisDeleteOpen({ status: false, id: '' })} />
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  fetchTask: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired
};

const mapStateToProps = ({ Reducer: state }) => ({
  tasks: state.tasks,
  loading: state.loading,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch({ type: actionTypes.FETCH_TASKS_START }),
  fetchTask: id => dispatch({ type: actionTypes.FETCH_TASK_START, payload: { id } }),
  setTasks: tasks => dispatch({ type: actionTypes.SET_TASKS, payload: { tasks } }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
