import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import * as actionTypes from '../constant';
import setAuthToken from '../token/setAuthToken';

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

export function* signUpUser(action) {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = action.payload.user;

    const response = yield call(() => axios.post(`${process.env.API_URL}/auth/signup`, {
      firstName, lastName, email, password
    }));

    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);

    yield put({
      type: actionTypes.SIGN_UP_SUCCESS,
      payload: { user: { id: decoded.user.id, name: decoded.user.name } }
    });
  } catch (e) {
    yield put({ type: actionTypes.SIGN_UP_FAIL, payload: { message: e.response.data } });
  }
}

export function* logInUser(action) {
  try {
    const response = yield call(() => axios.post(`${process.env.API_URL}/auth/login`, { email: action.payload.date.email, password: action.payload.date.password }));

    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);

    yield put({
      type: actionTypes.LOG_IN_SUCCESS,
      payload: { user: { _id: decoded.user._id, firstName: decoded.user.firstName } }
    });
  } catch (e) {
    yield put({ type: actionTypes.LOG_IN_FAIL, payload: { message: e.response.data } });
  }
}
