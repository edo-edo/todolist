import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

import TaskContext from '../../../storage/TaskContext';
import actionTypes from '../../../storage/actions';

const Modal = ({ handleClose }) => {
  const { id } = useParams();
  const history = useHistory();
  const { dispatch } = useContext(TaskContext);
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
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: actionTypes.REMOVE_TASK, id });
              history.push('/');
            }}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
