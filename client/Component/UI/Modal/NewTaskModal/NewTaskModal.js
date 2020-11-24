import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';

import * as actionTypes from '../../../../storage/constant';
import classes from './NewTaskModal.css';

const NewTaskModal = ({
  onAddTask, open, handleClose, status
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      status,
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
      handleClose();
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">
          <div>
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
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>
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
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={formik.handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save task
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

NewTaskModal.propTypes = {
  status: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAddTask: task => dispatch({ type: actionTypes.ADD_TASK_START, payload: { task } })
});

export default connect(null, mapDispatchToProps)(NewTaskModal);
