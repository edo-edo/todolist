import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../constant';

export function* fetchTasks() {
  try {
    const response = yield call(() => axios.get(`${process.env.API_URL}/tasks`));
    const { tasks } = response.data;
    yield put({ type: actionTypes.FETCH_TASKS_SUCCESS, payload: { tasks } });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_TASKS_FAIL, payload: { message: e.response.data } });
  }
}

export function* fetchTask(action) {
  try {
    const response = yield call(() => axios.get(`${process.env.API_URL}/tasks/${action.payload.id}`));
    const { task } = response.data;
    yield put({
      type: actionTypes.FETCH_TASK_SUCCESS,
      payload: { task: { _id: action.payload.id, ...task } }
    });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_TASK_FAIL, payload: { message: e.response.data } });
  }
}

export function* addTask(action) {
  try {
    const response = yield call(() => axios.post(`${process.env.API_URL}/tasks`, action.payload.task));
    const { id } = response.data;
    yield put({
      type: actionTypes.ADD_TASK_SUCCESS,
      payload: { task: { _id: id, ...action.payload.task } }
    });
  } catch (e) {
    yield put({ type: actionTypes.ADD_TASK_FAIL, payload: { message: e.response.data } });
  }
}

export function* removeTask(action) {
  try {
    yield call(() => axios.delete(`${process.env.API_URL}/tasks/${action.payload.id}`));
    yield put({ type: actionTypes.REMOVE_TASK_SUCCESS, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: actionTypes.REMOVE_TASK_FAIL, payload: { message: e.response.data } });
  }
}

export function* onCheckTask(action) {
  try {
    yield call(() => axios.put(`${process.env.API_URL}/tasks/${action.payload.id}`, { status: action.payload.status }));
    yield put({ type: actionTypes.ON_CHECK_SUCCESS, payload: { id: action.payload.id } });
  } catch (e) {
    yield put({ type: actionTypes.ON_CHECK_FAIL, payload: { message: e.response.data } });
  }
}
