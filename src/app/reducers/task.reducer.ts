import { ActionReducer, Action } from '@ngrx/store';
import { TaskService } from '../services/task.service';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_ERROR = 'GET_TASKS_ERROR';

export const ADD_TASK = 'ADD_USER';
export const ADD_TASK_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_TASK_ERROR = 'ADD_USER_ERROR';

export const REMOVE_TASK = 'ADD_USER';
export const REMOVE_TASK_SUCCESS = 'ADD_USER_SUCCESS';
export const REMOVE_TASK_ERROR = 'ADD_USER_ERROR';

// TODO: add remaining functions



// ??
const initialState = {
  data: [],
  pending: false,
  error: null
};



export function getTasks() {
  return {
    type: GET_TASKS
  };
}

export function addTask(task) {
  return {
    type: ADD_TASK,
    payload: {
      task
    }
  };
}

export function removeTask(task) {
  return {
    type: REMOVE_TASK,
    payload: {
      task
    }
  };
}


// const service = new TaskService();

export function tasks( state = initialState, action ) {

  switch (action.type) {

    case GET_TASKS:
      return Object.assign({}, state, { pending: true, error: null });
    case GET_TASKS_SUCCESS:
      return Object.assign({}, state, { data: action.payload, pending: false });
    case GET_TASKS_ERROR:
      return Object.assign({}, state, { pending: false, error: 'Error' });

    case ADD_TASK:
      return Object.assign({}, state, {pending: true, error: null});
    case ADD_TASK_SUCCESS:
      return Object.assign({}, state, {data: action.payload, pending: false});
    case ADD_TASK_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    case REMOVE_TASK:
      return Object.assign({}, state, {pending: true, error: null});
    case REMOVE_TASK_SUCCESS:
      return Object.assign({}, state, {data: action.payload, pending: false});
    case REMOVE_TASK_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
