import axios from 'axios';
import jwtDecode from 'jwt-decode';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
    localStorage.setItem('jwtToken', token);

    const decoded = jwtDecode(token);
    const { _id, firstName } = decoded.user;

    return { _id, firstName };
  }
  return delete axios.defaults.headers.common.Authorization;
};

export default setAuthToken;
