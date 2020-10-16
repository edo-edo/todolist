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
import DeleteModal from '../Component/UI/Modal/DeleteModal/DeleteModal';
import NewTaskModal from '../Component/UI/Modal/NewTaskModal/NewTaskModal';
import ErrorModal from '../Component/UI/Modal/ErrorModal/ErrorModal';
import * as actionTypes from '../storage/constant';
import Spinner from '../Component/UI/Spinner/Spinner';

const Tasks = ({
  tasks, loading, fetchTasks, error
}) => {
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {tasks.length === 0 && error.length === 0 && (
        <Typography align="center" component="h1"> You do not have task</Typography>
      )}
      {
        error.length !== 0 && (
          <ErrorModal message={error} />
        )
      }
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
                onTitle={() => history.push(`/tasks/${task._id}`)}
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
          <NewTaskModal
            handleClose={() => history.push('/')}
          />
        </Route>
        <Route path="/delete/:id">
          <DeleteModal
            handleClose={() => history.push('/')}
          />
        </Route>
      </Switch>
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
