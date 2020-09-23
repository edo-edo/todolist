import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../constant';
import {
  fetchTasks,
  fetchTask,
  addTask,
  removeTask,
  onCheckTask
} from './sagaActions';

function* rootSaga() {
  yield takeLatest(actionTypes.FETCH_TASKS_START, fetchTasks);
  yield takeLatest(actionTypes.FETCH_TASK_START, fetchTask);
  yield takeLatest(actionTypes.ADD_TASK_START, addTask);
  yield takeLatest(actionTypes.REMOVE_TASK_START, removeTask);
  yield takeLatest(actionTypes.ON_CHECK_START, onCheckTask);
}

export default rootSaga;
