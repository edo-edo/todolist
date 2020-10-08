import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

import ResetPass from './ResetPass/ResetPass';

const ModalForResetPass = ({ handleClose }) => (
  <div>
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogContent dividers>
        <ResetPass handleClose={handleClose} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ModalForResetPass.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default ModalForResetPass;
