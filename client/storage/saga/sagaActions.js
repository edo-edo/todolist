import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../constant';
import {
  fetchTasksApi,
  fetchTaskApi,
  addTaskApi,
  removeTaskApi,
  onCheckTaskApi,
  signUpUserApi,
  logInUserApi
} from './Apis/Apis';

export function* fetchTasks() {
  const { response, error } = yield call(fetchTasksApi);

  if (response) {
    const { tasks } = response.data;

    yield put({ type: actionTypes.FETCH_TASKS_SUCCESS, payload: { tasks } });
  } else {
    yield put({ type: actionTypes.FETCH_TASKS_FAIL, payload: { message: error.response.data } });
  }
}

export function* fetchTask(action) {
  const { response, error } = yield call(fetchTaskApi, action);

  if (response) {
    const { task } = response.data;

    yield put({
      type: actionTypes.FETCH_TASK_SUCCESS,
      payload: { task: { _id: action.payload.id, ...task } }
    });
  } else {
    yield put({ type: actionTypes.FETCH_TASK_FAIL, payload: { message: error.response.data } });
  }
}

export function* addTask(action) {
  const { response, error } = yield call(addTaskApi, action);

  if (response) {
    const { id } = response.data;

    yield put({
      type: actionTypes.ADD_TASK_SUCCESS,
      payload: { task: { _id: id, ...action.payload.task } }
    });
  } else {
    yield put({ type: actionTypes.ADD_TASK_FAIL, payload: { message: error.response.data } });
  }
}

export function* removeTask(action) {
  const { response, error } = yield call(removeTaskApi, action);

  if (response) {
    yield put({ type: actionTypes.REMOVE_TASK_SUCCESS, payload: { id: action.payload.id } });
  } else {
    yield put({ type: actionTypes.REMOVE_TASK_FAIL, payload: { message: error.response.data } });
  }
}

export function* onCheckTask(action) {
  const { response, error } = yield call(onCheckTaskApi, action);

  if (response) {
    yield put({ type: actionTypes.ON_CHECK_SUCCESS, payload: { id: action.payload.id } });
  } else {
    yield put({ type: actionTypes.ON_CHECK_FAIL, payload: { message: error.response.data } });
  }
}

export function* signUpUser(action) {
  const { response, error } = yield call(signUpUserApi, action);

  if (response) {
    const { token } = response.data;

    yield put({
      type: actionTypes.SIGN_UP_SUCCESS,
      payload: { token }
    });
  } else {
    yield put({ type: actionTypes.SIGN_UP_FAIL, payload: { message: error.response.data } });
  }
}

export function* logInUser(action) {
  const { response, error } = yield call(logInUserApi, action);

  if (response) {
    const { token } = response.data;

    yield put({
      type: actionTypes.LOG_IN_SUCCESS,
      payload: { token }
    });
  } else {
    yield put({ type: actionTypes.LOG_IN_FAIL, payload: { message: error.response.data } });
  }
}
