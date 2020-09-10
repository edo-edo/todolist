import React, { useState, useEffect } from 'react';
import { number } from 'prop-types';
import {
  useHistory,
  Route,
  Switch,
} from 'react-router-dom';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography
} from '@material-ui/core';

import Task from './Task/Task';
import ModalForDelete from '../Component/Ui/ModalForDelete/ModalForDelete';
import ModalForNewTask from '../Component/Ui/ModalForNewTask/ModalForNewTask';
import { LOCAL_STORAGE_KEY } from '../hoc/StorageKey';

const Tasks = () => {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTasks) {
      setTasks(storageTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const toggleCheck = id => {
    const newTasks = tasks.map(item => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    setTasks(newTasks);
  };

  const deleteHandler = id => {
    const idToInt = parseInt(id, number);
    const newTasks = [...tasks];
    const updatedTask = newTasks.filter(task => task.id !== idToInt);
    setTasks(updatedTask);
    history.push('/');
  };

  const addTaskHandler = task => {
    const newTasks = [...tasks];
    const updatedTask = newTasks.concat(task);
    setTasks(updatedTask);
  };

  return (
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
                onChecked={task.status}
                title={task.title}
                body={task.body}
                onCheckeHandler={toggleCheck}
                onClick={() => {
                  history.push(`/delete/${task.id}`);
                }}
                onTitle={() => history.push(`/tasks/${task.id}`)}
              />
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push('/new-task');
        }}
      >
        Add a task
      </Button>
      <Switch>
        <Route path="/new-task">
          <ModalForNewTask
            onSubmit={addTaskHandler}
            handleClose={() => {
              history.push('/');
            }}
          />
        </Route>
        <Route path="/delete/:id">
          <ModalForDelete
            handleClose={() => {
              history.push('/');
            }}
            onDelete={deleteHandler}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Tasks;
