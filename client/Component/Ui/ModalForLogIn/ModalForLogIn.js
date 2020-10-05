import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

import LogIn from './LogIn/LogIn';

const ModalForLogIn = ({ open, handleClose, openSignUp }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent dividers>
        <LogIn handleClose={handleClose} openSignUp={openSignUp} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ModalForLogIn.propTypes = {
  open: PropTypes.bool.isRequired,
  openSignUp: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ModalForLogIn;
