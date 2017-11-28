import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClient, HttpHandler} from '@angular/common/http';

import { TasksComponent } from './tasks.component';
import {TaskComponent} from '../task/task.component';
import {TaskService} from '../../services/task.service';
import {WebService} from '../../services/web.service';

describe('TasklistComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskComponent ],
      providers: [TaskService, WebService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // filter "showActiveTasks"
  it('filter value = active', () => {
    component.showActiveTasks();
    const filter = component.filter;
    expect(filter).toBe('active');
  });

  // filter "showAllTasks"
  it('filter value = completed', () => {
    component.showCompletedTasks();
    const filter = component.filter;
    expect(filter).toBe('completed');
  });

  // filter "showCompletedTasks"
  it('filter value = all', () => {
    component.showAllTasks();
    const filter = component.filter;
    expect(filter).toBe('all');
  });


});
