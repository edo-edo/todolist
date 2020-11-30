import axios from 'axios';
import jwtDecode from 'jwt-decode';

const setAuthToken = (token, logOut) => {
  if (token) {
    const decoded = jwtDecode(token);
    if (Date.now() >= decoded.exp * 1000) {
      delete axios.defaults.headers.common.Authorization;
      logOut();
      return false;
    }

    axios.defaults.headers.common.Authorization = token;
    localStorage.setItem('jwtToken', token);
    const { _id, firstName } = decoded.user;

    return { _id, firstName };
  }
  return delete axios.defaults.headers.common.Authorization;
};

export default setAuthToken;
