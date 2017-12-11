// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// modules
import { AppRoutingModule } from './routing.module';

// components
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';

// services
import { TaskService } from './services/task.service';
import { WebService } from './services/web.service';
import { TaskComponent } from './components/task/task.component';

import { StoreModule } from '../../node_modules/@ngrx/store/src/ng2';
import reducer from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TaskService,
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
