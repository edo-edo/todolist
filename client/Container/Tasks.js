import React, { useEffect } from 'react';
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

import Task from './Task/Task';
import ModalForDelete from '../Component/Ui/ModalForDelete/ModalForDelete';
import ModalForNewTask from '../Component/Ui/ModalForNewTask/ModalForNewTask';
import { fetchTasksAction, fetchTaskAction } from '../storage/actions';

const Tasks = ({ tasks, fetchTasks, fetchTask }) => {
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, []);

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
                key={task._id}
                id={task._id}
                title={task.title}
                body={task.body}
                status={task.status}
                onClick={() => history.push(`/delete/${task._id}`)}
                onTitle={() => {
                  fetchTask(task._id);
                  history.push(`/tasks/${task._id}`);
                }}
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
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTasks: PropTypes.func.isRequired,
  fetchTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks
});
const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasksAction()),
  fetchTask: id => dispatch(fetchTaskAction(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
