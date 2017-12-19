import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { Task } from '../../models/task.model';

describe('TaskComponent', () => {

  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const task: Task = { name: 'testName', isCompleted: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ]
    });
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.currentTask = task;
    jasmine.clock().install();
    fixture.detectChanges();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('task label is present', () => {
    const lblName = fixture.debugElement.query(By.css('label'));

    expect(lblName.nativeElement).not.toBeNull();
  });

  it('task label displays task name', () => {
    const lblName = fixture.debugElement.query(By.css('label'));

    expect(lblName.nativeElement.innerHTML).toEqual(task.name);
  });

  it('call editTask() => set isEditMode = true', () => {
    component.isEditMode = false;

    component.editTask();

    expect(component.isEditMode).toBeTruthy();
  });

  it('call editTask() => create element input#edit', () => {
    component.editTask();
    fixture.detectChanges();
    const inputEdit = fixture.debugElement.query(By.css('input#edit')).nativeElement;

    expect(inputEdit).toBeTruthy();
  });

  it('call editTask() => set focus on element input #edit', () => {
    component.editTask();
    fixture.detectChanges();
    const inputEdit = fixture.debugElement.query(By.css('input#edit')).nativeElement;
    const spy = spyOn(inputEdit, 'focus').and.callThrough();
    jasmine.clock().tick(0);

    expect(spy).toHaveBeenCalled();
  });

  it('call editReset() => set isEditMode = false', () => {
    component.isEditMode = true;

    component.editReset();

    expect(component.isEditMode).toBeFalsy();
  });

  it('call toggle() => call onToggle emitter', () => {
    const spy = spyOn(component.onToggle, 'emit').and.stub();

    component.toggle();

    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call remove() => call onRemove emitter', () => {
    const spy = spyOn(component.onRemove, 'emit').and.stub();

    component.remove();

    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call update() with empty name => do not call update emitter', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();

    component.update('');

    expect(spy).not.toHaveBeenCalled();
  });

  it('call update() with same name => do not call update emitter', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();

    component.update('testName');

    expect(spy).not.toHaveBeenCalled();
  });

  it('call update() with correct name => call update emitter with correct name', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();

    component.update('anotherName');

    expect(spy).toHaveBeenCalledWith(task);
  });

});
