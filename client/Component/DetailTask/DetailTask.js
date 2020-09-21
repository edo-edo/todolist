import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
} from '@material-ui/core';

import { boolean } from 'yup';
import classes from './DetailTask.css';

const DetailTask = ({ task }) => {
  if (Object.keys(task).length === 0) {
    return <Typography align="center" component="h1">Task not found</Typography>;
  }
  return (
    <div className={classes.Root}>
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
  task: PropTypes.objectOf(boolean, String, String, String).isRequired
};

const mapStateToProps = state => ({
  task: state.task
});

export default connect(mapStateToProps)(DetailTask);
