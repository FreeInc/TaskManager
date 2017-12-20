import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/tasklist/tasklist.component';
import { TaskComponent } from './components/task/task.component';
import { TaskService } from './services/task.service';
import { WebService } from './services/web.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
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
