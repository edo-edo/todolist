import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
} from '@material-ui/core';

import classes from './DetailTask.css';
import * as actionTypes from '../../storage/constant';
import ErrorModal from '../UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../UI/Spinner/Spinner';

const DetailTask = ({
  task, fetchTask, loading, error
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchTask(id);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={classes.Root}>
      {
        error.length !== 0 && (
          <ErrorModal message={error} />
        )
      }
      <Grid container spacing={5}>

        <Grid item xs={7}>
          <Paper className={classes.Paper}>
            <Typography component="h1">
              Id:
              {task._id}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <Paper className={classes.Paper}>
            <Checkbox
              checked={task.status}
              color="secondary"
            />

          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper className={classes.Paper}>
            <Typography component="h1">
              Title:
              {task.title}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.Paper}>
            <Typography component="h2">
              Body:
              {task.body}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
DetailTask.propTypes = {
  task: PropTypes.objectOf(Boolean, String, String, String).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchTask: PropTypes.func.isRequired
};

const mapStateToProps = ({ Reducer: state }) => ({
  task: state.task,
  loading: state.loading,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch({ type: actionTypes.FETCH_TASK_START, payload: { id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailTask);
