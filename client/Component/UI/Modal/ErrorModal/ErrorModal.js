import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import * as actionTypes from '../../../../storage/constant';

const ErrorModal = ({ message, logOut, clearTaskError }) => {
  useEffect(() => {
    if (message === 'Unauthorized') {
      logOut();
      clearTaskError();
    }
  }, [message]);
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

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  clearTaskError: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: actionTypes.LOG_OUT }),
  clearTaskError: () => dispatch({ type: actionTypes.CLEAR_TASK_ERROR })
});

export default connect(null, mapDispatchToProps)(ErrorModal);
