import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

const Modal = ({ handleClose, onDelete }) => {
  const { id } = useParams();
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
          <Button onClick={() => onDelete(id)} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Modal;
