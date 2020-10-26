import axios from 'axios';

export const fetchTasksApi = () => axios.get('/api/tasks');

export const fetchTaskApi = action => axios.get(`/api/tasks/${action.payload.id}`);

export const addTaskApi = action => axios.post('/api/tasks', action.payload.task);

export const removeTaskApi = action => axios.delete(`/api/tasks/${action.payload.id}`);

export const onCheckTaskApi = action => axios.put(`/api/tasks/${action.payload.id}`, { status: action.payload.status });

export const signUpUserApi = action => {
  const {
    firstName,
    lastName,
    email,
    password
  } = action.payload.user;

  return axios.post('/api/auth/signup', {
    firstName, lastName, email, password
  });
};

export const logInUserApi = action => {
  const { email, password } = action.payload.date;

  return axios.post('/api/auth/login', { email, password });
};

export const foundEmailApi = action => {
  const { email } = action.payload;

  return axios.post('/api/auth/forgot-password', { email });
};

export const resetPasswordApi = action => {
  const { password, rePassword, token } = action.payload;

  return axios.post('/api/auth/reset-password', { password, rePassword, token });
};
