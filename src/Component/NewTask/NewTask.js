import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
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
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(2, 'Too Short!')
        .max(13, 'Too Long!')
        .required(),
      body: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required()
    }),
    onSubmit: values => {
      const task = { ...values, id: '' };
      const storageTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      if (storageTask === undefined || storageTask.length === 0) {
        task.id = 0;
      } else {
        const newId = storageTask.length;
        task.id = newId + 1;
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
          {formik.touched.title && formik.errors.title && (
            <div className={classes.Error}>{formik.errors.title}</div>
          )}
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
          {formik.touched.body && formik.errors.body && (
            <div className={classes.Error}>{formik.errors.body}</div>
          )}
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
