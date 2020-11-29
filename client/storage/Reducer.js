import * as actionTypes from './constant';

const initialState = {
  tasks: [],
  task: {},
  loading: false,
  error: ''
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_START: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }
    case actionTypes.FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        loading: false,
        error: ''
      };
    }
    case actionTypes.SET_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        error: ''
      };
    }
    case actionTypes.FETCH_TASKS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    }
    case actionTypes.FETCH_TASK_START: {
      return {
        ...state,
        error: '',
        task: {}
      };
    }
    case actionTypes.FETCH_TASK_SUCCESS: {
      return {
        ...state,
        task: action.payload.task,
        error: ''
      };
    }
    case actionTypes.FETCH_TASK_FAIL: {
      return {
        ...state,
        error: action.payload.message
      };
    }
    case actionTypes.ADD_TASK_START: {
      return {
        ...state,
        error: ''
      };
    }
    case actionTypes.ADD_TASK_SUCCESS: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        error: ''
      };
    }
    case actionTypes.ADD_TASK_FAIL: {
      return {
        ...state,
        error: action.payload.message,
      };
    }
    case actionTypes.REMOVE_TASK_START: {
      return {
        ...state,
        error: ''
      };
    }
    case actionTypes.REMOVE_TASK_SUCCESS: {
      const newTasks = state.tasks.filter(task => task._id !== action.payload.id);
      return {
        ...state,
        tasks: newTasks,
        error: ''
      };
    }
    case actionTypes.REMOVE_TASK_FAIL: {
      return {
        ...state,
        error: action.payload.message,
      };
    }
    case actionTypes.ON_CHECK_START: {
      return {
        ...state,
        error: ''
      };
    }
    case actionTypes.ON_CHECK_SUCCESS: {
      const newState = state.tasks.map(item => {
        if (item._id === action.payload.id) {
          item.status = !item.status;
        }
        return item;
      });
      return {
        ...state,
        tasks: newState,
        error: ''
      };
    }
    case actionTypes.ON_CHECK_FAIL: {
      return {
        ...state,
        error: action.payload.message
      };
    }
    case actionTypes.CLEAR_TASK_ERROR: {
      return {
        ...state,
        error: ''
      };
    }

    default:
      return state;
  }
};

export default Reducer;
