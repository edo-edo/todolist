import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import * as actionTypes from '../../../../storage/constant';

const NewTask = ({ onAddTask }) => {
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
        .required(),
      status: Yup.boolean()
    }),
    onSubmit: values => {
      onAddTask(values);
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
  onAddTask: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAddTask: task => dispatch({ type: actionTypes.ADD_TASK_START, payload: { task } })
});

export default connect(null, mapDispatchToProps)(NewTask);
