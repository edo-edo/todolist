import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

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

const DeleteModal = ({ handleClose, onRemoveTask }) => {
  const { id } = useParams();
  const history = useHistory();
  return (
    <div>
      <Dialog
        open
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
                onRemoveTask(id);
                history.push('/');
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
};

DeleteModal.propTypes = {
  onRemoveTask: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRemoveTask: id => dispatch({ type: actionTypes.REMOVE_TASK_START, payload: { id } })
});

export default connect(null, mapDispatchToProps)(DeleteModal);
