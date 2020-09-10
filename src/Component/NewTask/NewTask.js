import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import {
  TextField, Checkbox, Typography, Grid, Button, FormControlLabel,
} from '@material-ui/core/';

import { LOCAL_STORAGE_KEY } from '../../hoc/StorageKey';
import classes from './NewTask.css';

const NewTask = ({ onSubmit }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      status: false,
    },
    onSubmit: values => {
      const task = { ...values, id: '' };
      const storageTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      if (storageTask === undefined || storageTask.length === 0) {
        task.id = 0;
      } else {
        const newId = storageTask.length;
        task.id = newId + 1;
      }
      if (storageTask) {
        storageTask.push(task);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageTask));
      } else {
        const newArray = [task];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArray));
      }
      onSubmit(task);
      history.push('/');
    },
  });

  return (
    <div className={classes.NewTask}>
      <Grid container spacing={4} className={classes.MainGrid}>

        <Grid item xs={12}>
          <Typography align="center" component="h6" variant="h5">Add a Task</Typography>
        </Grid>

        <Grid item xs={7}>
          <TextField
            onChange={formik.handleChange}
            fullWidth
            id="title"
            label="Title"
            value={formik.values.title}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            onChange={formik.handleChange}
            id="body"
            label="Body"
            multiline
            fullWidth
            rows={4}
            value={formik.values.body}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={(
              <Checkbox
                id="status"
                onChange={formik.handleChange}
                color="secondary"
              />
            )}
            label="Status"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={formik.handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save task
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

NewTask.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewTask;
