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

  toEdit?: Task | null;

  editedTask!: Task;

  receiveTask(event: Task){
    this.receivedTasks.push(event);
  }

  editTask(event: Task){
    this.toEdit = event;
  }

  updateTask(event: Task){
    this.editedTask = event;
    let task = this.receivedTasks.find(o => o.description === event.description);
    let foundIndex = this.receivedTasks.indexOf(task as Task);
    this.receivedTasks.splice(foundIndex, 1);
    this.receivedTasks.push(event);
    this.toEdit = null;
  }
}
