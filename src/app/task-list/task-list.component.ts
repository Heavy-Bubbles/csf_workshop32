import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  @Input() toDoList: Task[] = [];

  @Output() onEdit: EventEmitter<Task> = new EventEmitter();

  markComplete(task: Task){
    task.done = true;
  }

  deleteTask(task: Task){
    let taskIndex = this.toDoList.indexOf(task);
    this.toDoList.splice(taskIndex, 1);
  }

  editTask(task: Task){
    this.onEdit.emit(task);
  }

}
