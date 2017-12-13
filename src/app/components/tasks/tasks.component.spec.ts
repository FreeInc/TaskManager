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

  it('call removeCompletedTasks() => call taskService.removeTasks()', () => {
    const spy = spyOn(taskService, 'removeTasks');
    component.removeCompletedTasks();
    expect(spy).toHaveBeenCalled();
  });

  it('call toggleTask(task) => call taskService.toggleTask(task)', () => {
    const spy = spyOn(taskService, 'toggleTask');
    component.toggleTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call updateTask(task) => call taskService.updateTask(task)', () => {
    const spy = spyOn(taskService, 'updateTask');
    component.updateTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call removeTask(task) => call taskService.removeTask(task)', () => {
    const spy = spyOn(taskService, 'removeTask');
    component.removeTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call toggleAllTasks(true) => call taskService.toggleAllTasks(true)', () => {
    const spy = spyOn(taskService, 'toggleAllTasks');
    component.toggleAllTasks(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('call toggleAllTasks(false) => call taskService.toggleAllTasks(false)', () => {
    const spy = spyOn(taskService, 'toggleAllTasks');
    component.toggleAllTasks(false);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('call showActiveTasks() => set filter value equal to "active"', () => {
    component.showActiveTasks();
    const filter = component.filter;
    expect(filter).toBe('active');
  });

  it('call showActiveTasks() => active task pass the visibility checking', () => {
    component.showActiveTasks();
    const activeResult = component.isShow(activeTask);
    expect(activeResult).toBe(true);
  });

  it('call showActiveTasks() => completed task do not pass the visibility checking', () => {
    component.showActiveTasks();
    const completedResult = component.isShow(completedTask);
    expect(completedResult).toBe(false);
  });

  it('call showCompletedTasks() => set filter value equal to "completed"', () => {
    component.showCompletedTasks();
    const filter = component.filter;
    expect(filter).toBe('completed');
  });

  it('call showCompletedTasks() => completed task pass the visibility checking', () => {
    component.showCompletedTasks();
    const activeResult = component.isShow(completedTask);
    expect(activeResult).toBe(true);
  });

  it('call showCompletedTasks() => active task do not pass the visibility checking', () => {
    component.showCompletedTasks();
    const completedResult = component.isShow(activeTask);
    expect(completedResult).toBe(false);
  });

  it('call showAllTasks() => set filter value equal to "all"', () => {
    component.showAllTasks();
    const filter = component.filter;
    expect(filter).toBe('all');
  });

  it('call showCompletedTasks() => any task pass the visibility checking', () => {
    component.showAllTasks();
    const result = component.isShow(task);
    expect(result).toBeTruthy();
  });

  it('call addTask() with empty name => do not call taskService.addTask()', () => {
    const spy = spyOn(taskService, 'addTask');
    component.addTask('  ');
    expect(spy).not.toHaveBeenCalled();
  });

  it('call addTask() with empty name => call taskService.addTask(task)', () => {
    task = { name: 'TaskName', isCompleted: false };
    const test = spyOn(taskService, 'addTask');
    component.addTask('  TaskName     ');
    expect(test).toHaveBeenCalledWith(task);
  });

});
