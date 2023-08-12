import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() toEdit!: Task;

  editForm!: FormGroup;

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.editForm = this.fb.group({
      description: this.fb.control<string>(this.toEdit.description, [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>(this.toEdit.priority, [Validators.required]),
      due: this.fb.control<Date>(this.toEdit.due, [Validators.required, this.dateValidator])
    })
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
        const invalidDate = new Date();
        invalidDate.setDate(invalidDate.getDate() - 1);
        const dateToCheck = new Date(control.value);
        if (dateToCheck < invalidDate) {
            return {'invalidDate': true};
        }
    }
    return null;
  }

  @Output() onEdit: EventEmitter<Task> = new EventEmitter();

  edit(form: FormGroup){
    let task = <Task>({
      description: form.get('description')?.value,
      priority: form.get('priority')?.value,
      due: form.get('due')?.value,
      done: false
    })
    this.onEdit.emit(task);
  }

}
