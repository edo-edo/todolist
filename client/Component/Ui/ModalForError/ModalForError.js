import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const Modal = ({ message }) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="draggable-dialog-title"
      >

        <DialogTitle id="draggable-dialog-title">
          Error
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Modal;
