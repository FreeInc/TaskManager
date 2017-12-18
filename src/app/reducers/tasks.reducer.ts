import { Task } from '../models/task.model';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASKS = 'REMOVE_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';

const initialState = [
  { name: 'Learn Angular 5', isCompleted: true},
  { name: 'Kill them all', isCompleted: false}
];

export function tasks( state: Task[] = initialState, action ) {

  switch (action.type) {
    case ADD_TASK:
      return addTask(action.payload);
    case REMOVE_TASK:
      return removeTask(action.payload);
    case REMOVE_TASKS:
      return removeTasks(action.payload);
    case UPDATE_TASK:
      return updateTask(action.payload);
    default:
      return state;
  }

  function addTask(addedTask) {
    return [...state, addedTask];
  }

  function removeTask(removedTask) {
    const index = state.indexOf(removedTask);
    state.splice(index, 1);
    return state;
  }

  function removeTasks(removedTasks) {
    removedTasks.forEach((task: Task) => removeTask(task));
    return state;
  }

  function updateTask(updatedTask) {
    const index = state.indexOf(updatedTask);
    state[index] = updatedTask;
    return state;
  }

}
