import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Checkbox,
  Typography,
  Grid,
  Button,
  FormControlLabel,
} from '@material-ui/core/';

import classes from './NewTask.css';
import TaskContext from '../../../../storage/TaskContext';
import actionTypes from '../../../../storage/actions';

const NewTask = () => {
  const { dispatch } = useContext(TaskContext);
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
      dispatch({ type: actionTypes.ADD_TASK, task: values });
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

export default NewTask;
