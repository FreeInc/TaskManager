import { ComponentFixture, TestBed } from '@angular/core/testing';


import { TasksComponent } from './tasks.component';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';

import { Task } from '../../entities/task';

// mocks
import { TaskServiceMock } from '../../mocks/mock.task.service';

describe('TasklistComponent', () => {

  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskService: TaskService;
  let task: Task;
  const completedTask: Task = { name: 'task 1', isCompleted: true };
  const activeTask: Task = { name: 'task 2', isCompleted: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskComponent ],
      providers: [
        { provide: TaskService, useClass: TaskServiceMock }
      ]
    }).compileComponents();

    taskService = TestBed.get(TaskService);
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  xit('injector tests', () => {
    let taskService2 = fixture.debugElement.injector.get(TaskService);
    expect(taskService2).toBe(taskService);
  });
  */

  it('call removeTasks', () => {
    const spy = spyOn(taskService, 'removeTasks');
    component.removeCompletedTasks();
    expect(spy).toHaveBeenCalled();
  });

  it('call toggleTask with param task', () => {
    const spy = spyOn(taskService, 'toggleTask');
    component.toggleTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call updateTask with param task', () => {
    const spy = spyOn(taskService, 'updateTask');
    component.updateTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call removeTask with param task', () => {
    const spy = spyOn(taskService, 'removeTask');
    component.removeTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('toggle all tests as completed', () => {
    const spy = spyOn(taskService, 'toggleAllTasks');
    component.toggleAllTasks(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('toggle all tests as incompleted', () => {
    const spy = spyOn(taskService, 'toggleAllTasks');
    component.toggleAllTasks(false);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('set filter value equal to "active"', () => {
    component.showActiveTasks();
    const filter = component.filter;
    expect(filter).toBe('active');
    const activeResult = component.isShow(activeTask);
    expect(activeResult).toBe(true);
    const completedResult = component.isShow(completedTask);
    expect(completedResult).toBe(false);
  });

  it('set filter value equal to "completed"', () => {
    component.showCompletedTasks();
    const filter = component.filter;
    expect(filter).toBe('completed');
    const activeResult = component.isShow(activeTask);
    expect(activeResult).toBe(false);
    const completedResult = component.isShow(completedTask);
    expect(completedResult).toBe(true);
  });

  it('set filter value equal to "all"', () => {
    component.showAllTasks();
    const result = component.isShow(task);
    const filter = component.filter;
    expect(filter).toBe('all');
    expect(result).toBeTruthy();
  });

  it('call addTask with empty name', () => {
    const spy = spyOn(taskService, 'addTask');
    component.addTask('  ');
    expect(spy).not.toHaveBeenCalled();
  });

  it('call addTask with not empty name', () => {
    const test = spyOn(taskService, 'addTask');
    task = { name: 'TaskName', isCompleted: false };
    component.addTask('  TaskName     ');
    expect(test).toHaveBeenCalledWith(task);
  });

});
