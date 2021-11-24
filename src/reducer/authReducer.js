export const initialState = { user: null, isLoading: false,tasksIsLoading: false, tasks: []};

export const actionTypes = { SET_USER: "SET_USER", SET_LOADING: "IS_LOADING", SET_TASKS: "SET_TASKS",REMOVE_ITEM: "REMOVE_ITEM",TASKS_IS_LOADING: "TASKS_IS_LOADING" };

 const authReducer = (state,action)=>{
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case actionTypes.TASKS_IS_LOADING:
      return {...state,tasksIsLoading: action.tasksIsLoading}
    case actionTypes.SET_TASKS:
      return {...state, tasks: action.tasks}
    
    default:
      return state;
  }
}

export default authReducer

