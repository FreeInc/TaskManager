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

  it('task label is exist', () => {
    const lblName = fixture.debugElement.query(By.css('label'));

    expect(lblName.nativeElement).not.toBeNull();
  });

  it('task label displays the task name', () => {
    const lblName = fixture.debugElement.query(By.css('label'));

    expect(lblName.nativeElement.innerHTML).toEqual(task.name);
  });

  it('editTask() sets the isEditMode equal to the "true"', () => {
    component.isEditMode = false;

    component.editTask();

    expect(component.isEditMode).toBe(true);
  });

  it('editTask() creates the element input with the id "edit"', () => {
    component.editTask();
    fixture.detectChanges();
    const inputEdit = fixture.debugElement.query(By.css('input#edit')).nativeElement;

    expect(inputEdit).toBeTruthy();
  });

  it('editTask() sets the focus on the element input with id "edit"', () => {
    component.editTask();
    fixture.detectChanges();
    const inputEdit = fixture.debugElement.query(By.css('input#edit')).nativeElement;
    const spy = spyOn(inputEdit, 'focus').and.callThrough();
    jasmine.clock().tick(0);

    expect(spy).toHaveBeenCalled();
  });

  it('editReset() sets the isEditMode equal to the "false"', () => {
    component.isEditMode = true;

    component.editReset();

    expect(component.isEditMode).toBe(false);
  });

  it('toggle() calls the onToggle emitter', () => {
    const spy = spyOn(component.onToggle, 'emit').and.stub();

    component.toggle();

    expect(spy).toHaveBeenCalledWith(task);
  });

  it('remove() calls the onRemove emitter', () => {
    const spy = spyOn(component.onRemove, 'emit').and.stub();

    component.remove();

    expect(spy).toHaveBeenCalledWith(task);
  });

  it('update() with the empty name does not call the onUpdate emitter', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();

    component.update('');

    expect(spy).not.toHaveBeenCalled();
  });

  it('update() with the same name does not call the onUpdate emitter', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();

    component.update('testName');

    expect(spy).not.toHaveBeenCalled();
  });

  it('update() with the correct param calls the onUpdate emitter with the same param', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();

    component.update('anotherName');

    expect(spy).toHaveBeenCalledWith(task);
  });

});
