import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
} from '@material-ui/core';

import * as actionTypes from '../../../../../storage/constant';
import ErrorModal from '../../ErrorModal/ErrorModal';
import Spinner from '../../../Spinner/Spinner';

const DetailTask = ({
  task, fetchTask, loading, error, id
}) => {
  useEffect(() => {
    fetchTask(id);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      {
        error.length !== 0 && (
          <ErrorModal message={error} />
        )
      }
      <Typography component="h2">{task.body}</Typography>
    </div>
  );
};
DetailTask.propTypes = {
  task: PropTypes.objectOf(Boolean, String, String, String).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchTask: PropTypes.func.isRequired
};

const mapStateToProps = ({ Reducer: state }) => ({
  task: state.task,
  loading: state.loading,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch({ type: actionTypes.FETCH_TASK_START, payload: { id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailTask);
