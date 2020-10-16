import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

import ForgotPassword from './ForgotPassword/ForgotPassword';

const ForgotPasswordModal = ({ open, handleClose }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent dividers>
        <ForgotPassword handleClose={handleClose} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ForgotPasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ForgotPasswordModal;
