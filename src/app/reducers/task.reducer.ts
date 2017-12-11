import { WebService } from '../services/web.service';
import { Task } from '../entities/task';

export const GET_TASKS = 'GET_TASKS';

export const ADD_TASK = 'ADD_TASK';

export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASKS = 'REMOVE_TASKS';


export const UPDATE_TASK = 'UPDATE_TASK';


// TODO: add remaining functions



// ??
const initialState = [
    { name: 'Learn Angular 5', isCompleted: true},
    { name: 'Kill them all', isCompleted: false}
  ];


//
// this.WebService.getTasks().subscribe((data) => {
//   const localTasks = JSON.parse(localStorage.getItem('taskManager') || '[]');
//   if (localTasks.length) {
//     this.tasks = localTasks;
//   } else {
//     this.tasks = data;
//   }

// const localTasks = JSON.parse(localStorage.getItem('taskManager') || '[]');

// export function addTask(task) {
//   return {
//     type: ADD_TASK,
//     payload: {
//       task
//     }
//   };
// }





export function tasks( state = initialState, action ) {

  const data = action.payload;


  switch (action.type) {

    case GET_TASKS:
      return state;

    case ADD_TASK:
      return addTask();

    case REMOVE_TASK:
      return removeTask(data);

    case REMOVE_TASKS:
      return removeTasks(data);

    // case UPDATE_TASK:
    //   return updateTask();

    default:
      return state;
  }




  function addTask() {
    return [...state, data];
  }

  function removeTask(removedTask) {
    state.splice(state.indexOf(removedTask), 1);
    return state;
  }

  function removeTasks(removedTasks) {
    removedTasks.forEach((task: Task) => removeTask(task));
    return state;
  }


  // function updateTask() {
  //   //this.srv.toggleTask(task);
  // }



  // function updateLocalStorage() {
  //   localStorage.setItem('taskManager', JSON.stringify(state));
  // }

}
