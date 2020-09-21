import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

import NewTask from './NewTask/NewTask';

const ModalForNewTask = ({ handleClose }) => (
  <div>
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogContent>
        <NewTask />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ModalForNewTask.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default ModalForNewTask;
