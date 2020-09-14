import actionTypes from './actions';

const Reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASKS:
      return [
        ...action.tasks
      ];
    case actionTypes.ADD_TASK: {
      const newTask = { ...action.task, id: state.length + 1 };
      const newState = [...state, newTask];
      return newState;
    }
    case actionTypes.REMOVE_TASK: {
      const idToInt = parseInt(action.id, 10);
      return state.filter(task => task.id !== idToInt);
    }
    case actionTypes.ON_CHECK: {
      const newState = state.map(item => {
        if (item.id === action.id) {
          item.status = !item.status;
        }
        return item;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default Reducer;
