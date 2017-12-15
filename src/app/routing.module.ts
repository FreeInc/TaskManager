// @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import {TasksComponent} from './components/tasks/tasks.component';

// routes
const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '/tasks' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
