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

// @ngrx store
import { StoreModule } from '@ngrx/store';
import { tasks } from './reducers/task.reducer';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({tasks})
  ],
  providers: [
    TaskService,
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
