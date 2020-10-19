import * as actionTypes from './constant';
import setAuthToken from './token/setAuthToken';

const initialState = {
  signUpError: '',
  logInError: '',
  isAuthenticated: false,
  authError: false,
  user: {},
  isEmail: false,
  emailError: '',
  loading: false,
  resetPassError: ''
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
    case actionTypes.FOUND_EMAIL_START: {
      return {
        ...state,
        isEmail: false,
        emailError: '',
        loading: true
      };
    }
    case actionTypes.FOUND_EMAIL_FAIL: {
      return {
        ...state,
        isEmail: false,
        emailError: action.payload.message,
        loading: false
      };
    }
    case actionTypes.FOUND_EMAIL_SUCCESS: {
      return {
        ...state,
        isEmail: true,
        emailError: '',
        loading: false
      };
    }
    case actionTypes.CLEAR_EMAIL_ERROR: {
      return {
        ...state,
        isEmail: false,
        emailError: '',
        loading: false,
        resetPassError: ''
      };
    }
    case actionTypes.RESET_PASSWORD_START: {
      return {
        ...state,
        resetPassError: ''
      };
    }
    case actionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassError: '',
        isAuthenticated: true,
        user: setAuthToken(action.payload.token)
      };
    }
    case actionTypes.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        resetPassError: action.payload.message
      };
    }

    default:
      return state;
  }
};

export default userReducer;
