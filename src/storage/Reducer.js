import * as actionTypes from './constant';

const initialState = { tasks: '' };
try {
  const storageTasks = JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE_KEY));
  if (storageTasks) {
    initialState.tasks = storageTasks;
  }
} catch (error) {
  initialState.tasks = [];
}
const Reducer = (state = initialState.tasks, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      const ids = state.map(task => task.id);
      let id = Math.max(...ids);
      if (id === -Infinity) {
        id = 1;
      } else {
        id += 1;
      }
      const newTask = { ...action.payload.task, id };
      const newState = [...state, newTask];
      return newState;
    }
    case actionTypes.REMOVE_TASK: {
      const idToInt = parseInt(action.payload.id, 10);
      return state.filter(task => task.id !== idToInt);
    }
    case actionTypes.ON_CHECK: {
      const newState = state.map(item => {
        if (item.id === action.payload.id) {
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
