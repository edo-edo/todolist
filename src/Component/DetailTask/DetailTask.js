import React from 'react';
import { useParams } from 'react-router-dom';
import { number } from 'prop-types';

import {
  Paper, Grid, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';

import { LOCAL_STORAGE_KEY } from '../../hoc/StorageKey';
import classes from './DetailTask.css';

const DetailTask = () => {
  const { id } = useParams();
  const storageTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const idToInt = parseInt(id, number);
  const task = storageTask.find(getTask => getTask.id === idToInt);

  if (!task) {
    return <Typography align="center" component="h1"> Task not found</Typography>;
  }
  return (
    <div className={classes.Root}>
      <Grid container spacing={5}>

        <Grid item xs={7}>
          <Paper className={classes.Paper}>
            <Typography component="h1">
              Id:
              {task.id}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <Paper className={classes.Paper}>
            <FormControlLabel
              control={
                (
                  <Checkbox
                    checked={task.status}
                    color="secondary"
                  />
                  )
                }
              label="Status"
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

export default DetailTask;
