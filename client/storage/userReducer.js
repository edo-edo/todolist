import * as actionTypes from './constant';
import setAuthToken from './token/setAuthToken';

const initialState = {
  signUpError: '',
  logInError: '',
  isAuthenticated: false,
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
        signUpError: 'done',
        isAuthenticated: true,
        user: action.payload.user
      };
    }
    case actionTypes.CLEAR_ERROR: {
      return {
        ...state,
        signUpError: '',
        logInError: ''
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
        logInError: 'done',
        isAuthenticated: true,
        user: action.payload.user
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
