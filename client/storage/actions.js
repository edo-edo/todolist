import axios from 'axios';
import * as actionTypes from './constant';

export const fetchTasksAction = () => dispatch => {
  axios.get(`${process.env.API}/tasks`)
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_TASKS,
        payload: {
          tasks: response.data.tasks
        }
      });
    })
    .catch(() => {
      dispatch({
        type: actionTypes.FETCH_TASKS,
        payload: {
          tasks: []
        }
      });
    });
};

export const addTaskAction = task => dispatch => {
  axios.post(`${process.env.API}/tasks`, task)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_TASK,
        payload: {
          task: { _id: res.data.id, ...task }
        }
      });
    })
    .catch(() => {

    });
};
export const fetchTaskAction = id => dispatch => {
  axios.get(`${process.env.API}/tasks/${id}`)
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_TASK,
        payload: {
          task: response.data.task
        }
      });
    })
    .catch(() => {

    });
};

export const removeTaskAction = id => dispatch => {
  axios.delete(`${process.env.API}/tasks/${id}`)
    .then(
      dispatch({
        type: actionTypes.REMOVE_TASK,
        payload: {
          id
        }
      })
    )
    .catch(() => {

    });
};

export const onCheckAction = (id, status) => dispatch => {
  axios.put(`${process.env.API}/tasks/${id}`, { status })
    .then(
      dispatch({
        type: actionTypes.ON_CHECK,
        payload: {
          id
        }
      })
    )
    .catch(() => {

    });
};
