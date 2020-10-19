import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../constant';
import {
  fetchTasks,
  fetchTask,
  addTask,
  removeTask,
  onCheckTask,
  signUpUser,
  logInUser,
  foundEmail,
  resetPassword,
} from './sagaActions';

function* rootSaga() {
  yield takeLatest(actionTypes.FETCH_TASKS_START, fetchTasks);
  yield takeLatest(actionTypes.FETCH_TASK_START, fetchTask);
  yield takeLatest(actionTypes.ADD_TASK_START, addTask);
  yield takeLatest(actionTypes.REMOVE_TASK_START, removeTask);
  yield takeLatest(actionTypes.ON_CHECK_START, onCheckTask);
  yield takeLatest(actionTypes.SIGN_UP_START, signUpUser);
  yield takeLatest(actionTypes.LOG_IN_START, logInUser);
  yield takeLatest(actionTypes.FOUND_EMAIL_START, foundEmail);
  yield takeLatest(actionTypes.RESET_PASSWORD_START, resetPassword);
}

export default rootSaga;
