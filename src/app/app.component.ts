import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do List';

  receivedTasks: Task[] = [];

  receiveTask(event: Task){
    this.receivedTasks.push(event);
  }
}
