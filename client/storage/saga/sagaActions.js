import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../constant';
import {
  fetchTasksApi,
  fetchTaskApi,
  addTaskApi,
  removeTaskApi,
  onCheckTaskApi,
  signUpUserApi,
  logInUserApi,
  foundEmailApi,
  resetPasswordApi,
} from './Apis/Apis';

export function* fetchTasks() {
  try {
    const response = yield call(fetchTasksApi);
    if (response) {
      const { tasks } = response.data;

      yield put({ type: actionTypes.FETCH_TASKS_SUCCESS, payload: { tasks } });
    }
  } catch (err) {
    yield put({ type: actionTypes.FETCH_TASKS_FAIL, payload: { message: err.response.data } });
  }
}

export function* fetchTask(action) {
  try {
    const response = yield call(fetchTaskApi, action);

    if (response) {
      const { task } = response.data;

      yield put({
        type: actionTypes.FETCH_TASK_SUCCESS,
        payload: { task: { _id: action.payload.id, ...task } }
      });
    }
  } catch (err) {
    yield put({ type: actionTypes.FETCH_TASK_FAIL, payload: { message: err.response.data } });
  }
}

export function* addTask(action) {
  try {
    const response = yield call(addTaskApi, action);

    if (response) {
      const { id } = response.data;

      yield put({
        type: actionTypes.ADD_TASK_SUCCESS,
        payload: { task: { _id: id, ...action.payload.task } }
      });
    }
  } catch (err) {
    yield put({ type: actionTypes.ADD_TASK_FAIL, payload: { message: err.response.data } });
  }
}

export function* removeTask(action) {
  try {
    const response = yield call(removeTaskApi, action);

    if (response) {
      yield put({ type: actionTypes.REMOVE_TASK_SUCCESS, payload: { id: action.payload.id } });
    }
  } catch (err) {
    yield put({ type: actionTypes.REMOVE_TASK_FAIL, payload: { message: err.response.data } });
  }
}

export function* onCheckTask(action) {
  try {
    const response = yield call(onCheckTaskApi, action);

    if (response) {
      yield put({ type: actionTypes.ON_CHECK_SUCCESS, payload: { id: action.payload.id } });
    }
  } catch (err) {
    yield put({ type: actionTypes.ON_CHECK_FAIL, payload: { message: err.response.data } });
  }
}

export function* signUpUser(action) {
  try {
    const response = yield call(signUpUserApi, action);

    if (response) {
      const { token } = response.data;

      yield put({
        type: actionTypes.SIGN_UP_SUCCESS,
        payload: { token }
      });
    }
  } catch (err) {
    yield put({ type: actionTypes.SIGN_UP_FAIL, payload: { message: err.response.data } });
  }
}

export function* logInUser(action) {
  try {
    const response = yield call(logInUserApi, action);

    if (response) {
      const { token } = response.data;

      yield put({
        type: actionTypes.LOG_IN_SUCCESS,
        payload: { token }
      });
    }
  } catch (err) {
    yield put({ type: actionTypes.LOG_IN_FAIL, payload: { message: err.response.data } });
  }
}

export function* foundEmail(action) {
  try {
    const response = yield call(foundEmailApi, action);

    if (response) {
      yield put({ type: actionTypes.FOUND_EMAIL_SUCCESS });
    }
  } catch (err) {
    yield put({ type: actionTypes.FOUND_EMAIL_FAIL, payload: { message: err.response.data } });
  }
}

export function* resetPassword(action) {
  try {
    const response = yield call(resetPasswordApi, action);

    if (response) {
      const { token } = response.data;
      yield put({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: { token } });
    }
  } catch (err) {
    yield put({ type: actionTypes.RESET_PASSWORD_FAIL, payload: { message: err.response.data } });
  }
}
