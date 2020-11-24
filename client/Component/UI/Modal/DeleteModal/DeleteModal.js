import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import * as actionTypes from '../../../../storage/constant';
import classes from './DeleteModal.css';

const DeleteModal = ({
  open, handleClose, onRemoveTask
}) => (
  <div>
    <Dialog
      open={open.status}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">
        Delete task
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          do you want to delete this task?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <div className={classes.Cancel}>
          <IconButton onClick={handleClose} aria-label="cancel">
            <CancelIcon />
          </IconButton>
        </div>
        <div className={classes.Delete}>
          <IconButton
            onClick={() => {
              onRemoveTask(open.id);
              handleClose();
            }}
            aria-label="delete"
          >

            <DeleteIcon />
          </IconButton>
        </div>

      </DialogActions>
    </Dialog>
  </div>
);

DeleteModal.propTypes = {
  open: PropTypes.objectOf(Boolean, String).isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRemoveTask: id => dispatch({ type: actionTypes.REMOVE_TASK_START, payload: { id } })
});

export default connect(null, mapDispatchToProps)(DeleteModal);
