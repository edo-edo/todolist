import React, { useEffect, useReducer } from 'react';
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

import Task from './Task/Task';
import ModalForDelete from '../Component/Ui/ModalForDelete/ModalForDelete';
import ModalForNewTask from '../Component/Ui/ModalForNewTask/ModalForNewTask';
import Reducer from '../storage/Reducer';
import TaskContext from '../storage/TaskContext';
import actionTypes from '../storage/actions';

const Tasks = () => {
  const history = useHistory();
  const [tasks, dispatch] = useReducer(Reducer, []);

  useEffect(() => {
    try {
      const storageTasks = JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE_KEY));
      if (storageTasks) {
        dispatch({ type: actionTypes.ADD_TASKS, tasks: storageTasks });
      }
    } catch (error) {
      dispatch({ type: actionTypes.ADD_TASKS, tasks: [] });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(process.env.LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ dispatch }}>
      <div>
        {tasks.length === 0 && (
          <Typography align="center" component="h1"> You do not have task</Typography>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.map(task => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  body={task.body}
                  status={task.status}
                  onClick={() => history.push(`/delete/${task.id}`)}
                  onTitle={() => history.push(`/tasks/${task.id}`)}
                />
              )) }
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/new-task')}
        >
          Add a task
        </Button>
        <Switch>
          <Route path="/new-task">
            <ModalForNewTask
              handleClose={() => history.push('/')}
            />
          </Route>
          <Route path="/delete/:id">
            <ModalForDelete
              handleClose={() => history.push('/')}
            />
          </Route>
        </Switch>
      </div>
    </TaskContext.Provider>
  );
};

export default Tasks;
