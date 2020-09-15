import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

import * as actionTypes from '../../../storage/constant';

const Modal = ({ handleClose, onRemoveTask }) => {
  const { id } = useParams();
  const history = useHistory();
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
              onRemoveTask(id);
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
  onRemoveTask: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRemoveTask: id => dispatch({ type: actionTypes.REMOVE_TASK, payload: { id } })
});

export default connect(null, mapDispatchToProps)(Modal);
