import axios from 'axios';

const { API_URL } = process.env;

export const fetchTasksApi = () => axios.get(`${API_URL}/tasks`);

export const fetchTaskApi = action => axios.get(`${API_URL}/tasks/${action.payload.id}`);

export const addTaskApi = action => axios.post(`${API_URL}/tasks`, action.payload.task);

export const removeTaskApi = action => axios.delete(`${API_URL}/tasks/${action.payload.id}`);

export const onCheckTaskApi = action => axios.put(`${API_URL}/tasks/${action.payload.id}`, { status: action.payload.status });

export const signUpUserApi = action => {
  const {
    firstName,
    lastName,
    email,
    password
  } = action.payload.user;

  return axios.post(`${API_URL}/auth/signup`, {
    firstName, lastName, email, password
  });
};

export const logInUserApi = action => {
  const { email, password } = action.payload.date;

  return axios.post(`${API_URL}/auth/login`, { email, password });
};