import * as actionTypes from './constant';
import setAuthToken from './token/setAuthToken';

const initialState = {
  signUpError: '',
  logInError: '',
  isAuthenticated: false,
  authError: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_START: {
      return {
        ...state,
        signUpError: ''
      };
    }
    case actionTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        authError: true,
        isAuthenticated: true,
        user: setAuthToken(action.payload.token)
      };
    }
    case actionTypes.CLEAR_ERROR: {
      return {
        ...state,
        logInError: '',
        signUpError: '',
        authError: false
      };
    }
    case actionTypes.SIGN_UP_FAIL: {
      return {
        ...state,
        signUpError: action.payload.message

      };
    }
    case actionTypes.LOG_IN_START: {
      return {
        ...state,
        logInError: ''
      };
    }
    case actionTypes.LOG_IN_SUCCESS: {
      return {
        ...state,
        logInError: '',
        authError: true,
        isAuthenticated: true,
        user: setAuthToken(action.payload.token)
      };
    }
    case actionTypes.LOG_IN_FAIL: {
      return {
        ...state,
        logInError: action.payload.message

      };
    }
    case actionTypes.LOG_OUT: {
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    }
    case actionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.AuthStatus,
        user: action.payload.user
      };
    }
    default:
      return state;
  }
};

export default userReducer;
