import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

import { TasksComponent } from './tasks.component';
import {TaskComponent} from '../task/task.component';
import {TaskService} from '../../services/task.service';
import {WebService} from '../../services/web.service';

import { Task } from '../../entities/task';

describe('TasklistComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let srv: TaskService;
  let task: Task;

  let completedTask:Task = { name: 'task 1', isCompleted: true };
  let activeTask:Task = { name: 'task 2', isCompleted: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskComponent ],
      providers: [ TaskService, WebService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    srv = fixture.debugElement.injector.get(TaskService);
    fixture.detectChanges();
  });

  it('call removeTasks', () => {
    let test = spyOn(srv, 'removeTasks').and.stub();
    component.removeCompletedTasks();
    expect(test).toHaveBeenCalled();
  });

  it('call toggleTask with param task', () => {
    let test = spyOn(srv, 'toggleTask');
    component.toggleTask(task);
    expect(test).toHaveBeenCalledWith(task);
  });

  it('call updateTask with param task', () => {
    let test = spyOn(srv, 'updateTask');
    component.updateTask(task);
    expect(test).toHaveBeenCalledWith(task);
  });

  it('call removeTask with param task', () => {
    let test = spyOn(srv, 'removeTask');
    component.removeTask(task);
    expect(test).toHaveBeenCalledWith(task);
  });

  it('toggle all tests as completed', () => {
    let test = spyOn(srv, 'toggleAllTasks');
    component.toggleAllTasks(true);
    expect(test).toHaveBeenCalledWith(true);
  });

  it('toggle all tests as incompleted', () => {
    let test = spyOn(srv, 'toggleAllTasks');
    component.toggleAllTasks(false);
    expect(test).toHaveBeenCalledWith(false);
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
    let test = spyOn(srv, 'addTask');
    component.addTask('  ');
    expect(test).not.toHaveBeenCalled();
  });

  it('call addTask with not empty name', () => {
    let test = spyOn(srv, 'addTask');
    let task: Task = { name: "TaskName", isCompleted: false };
    component.addTask('  TaskName     ');
    expect(test).toHaveBeenCalledWith(task);
  });


});