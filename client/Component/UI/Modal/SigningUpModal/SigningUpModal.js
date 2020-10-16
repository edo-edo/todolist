import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

import SingingUp from './SigningUp/SigningUp';

const SigningUpModal = ({ open, handleClose, openLogin }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent dividers>
        <SingingUp handleClose={handleClose} openLogin={openLogin} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

SigningUpModal.propTypes = {
  open: PropTypes.bool.isRequired,
  openLogin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SigningUpModal;
