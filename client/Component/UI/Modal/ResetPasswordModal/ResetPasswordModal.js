import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

import ResetPassword from './ResetPassword/ResetPassword';

const ResetPasswordModal = ({ handleClose }) => (
  <div>
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogContent dividers>
        <ResetPassword handleClose={handleClose} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ResetPasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default ResetPasswordModal;
