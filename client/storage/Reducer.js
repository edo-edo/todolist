import * as actionTypes from './constant';

const initialState = { tasks: [], task: {}, loading: true };

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks
      };
    }
    case actionTypes.FETCH_TASK: {
      return {
        ...state,
        task: action.payload.task
      };
    }
    case actionTypes.ADD_TASK: {
      const newState = [...state.tasks, action.payload.task];
      return {
        ...state,
        tasks: newState
      };
    }
    case actionTypes.REMOVE_TASK: {
      const newTasks = state.tasks.filter(task => task._id !== action.payload.id);
      return {
        ...state,
        tasks: newTasks
      };
    }
    case actionTypes.ON_CHECK: {
      const newState = state.tasks.map(item => {
        if (item._id === action.payload.id) {
          item.status = !item.status;
        }
        return item;
      });
      return {
        ...state,
        tasks: newState
      };
    }
    default:
      return state;
  }
};

export default Reducer;
