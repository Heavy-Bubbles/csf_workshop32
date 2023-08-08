import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms'
import { Task } from '../task';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit{
  toDoForm!: FormGroup;

  constructor (private fb: FormBuilder){}

  ngOnInit() {
    this.toDoForm = this.fb.group({
      description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>('low', Validators.required),
      due: this.fb.control<Date>(new Date(), [Validators.required, this.dateValidator])
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

  @Output() onAdd: EventEmitter<Task> = new EventEmitter();

  addToDo(form: FormGroup){
    let task = <Task>({
      description: form.get('description')?.value,
      priority: form.get('priority')?.value,
      due: form.get('due')?.value
    })
    this.onAdd.emit(task);
  }

}
