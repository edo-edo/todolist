import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  useHistory,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from '@material-ui/core';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Task from './Task/Task';
import DeleteModal from '../Component/UI/Modal/DeleteModal/DeleteModal';
import NewTaskModal from '../Component/UI/Modal/NewTaskModal/NewTaskModal';
import ErrorModal from '../Component/UI/Modal/ErrorModal/ErrorModal';
import * as actionTypes from '../storage/constant';
import Spinner from '../Component/UI/Spinner/Spinner';

import Column from '../Component/Draggable/Column/Column';
import MovableItem from '../Component/Draggable/MovableItem/MovableItem';
import classes from './Tasks.css';

const Tasks = ({
  tasks, loading, fetchTasks, error
}) => {
  const history = useHistory();
  const [items, setItems] = useState(tasks);
  console.log(tasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const moveCardHandler = (dragIndex, hoverIndex) => {
    console.log(dragIndex, 'dragIndex');
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      }));
    }
  };

  const returnItemsForColumn = columnName => tasks
    .filter(task => task.status === columnName)
    .map((task, index) => (
      <MovableItem
        key={task._id}
        id={task._id}
        name={task.title}
        currentColumnName={task.status}
        setItems={setItems}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ));

  return (
    <div className={classes.Tasks}>
      <DndProvider backend={HTML5Backend}>
        <Column title={false}>
          {returnItemsForColumn(false)}
        </Column>

        <Column title>
          {returnItemsForColumn(true)}
        </Column>
      </DndProvider>
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchTasks: PropTypes.func.isRequired
};

const mapStateToProps = ({ Reducer: state }) => ({
  tasks: state.tasks,
  loading: state.loading,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch({ type: actionTypes.FETCH_TASKS_START }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
