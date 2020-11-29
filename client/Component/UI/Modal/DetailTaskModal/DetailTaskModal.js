import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import ErrorModal from '../ErrorModal/ErrorModal';

const DetailTaskModal = ({
  open, handleClose, error, task
}) => (
  <div>
    {
        error.length !== 0 && (
          <ErrorModal message={error} />
        )
      }
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">
        {task.title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          { task.body}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

DetailTaskModal.propTypes = {
  task: PropTypes.objectOf(Boolean, String, String, String).isRequired,
  open: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

const mapStateToProps = ({ Reducer: state }) => ({
  task: state.task,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(DetailTaskModal);
