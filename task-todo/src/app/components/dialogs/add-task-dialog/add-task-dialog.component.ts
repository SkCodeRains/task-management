import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TasksService } from '../../../services/tasks.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Itask } from '../../interfaces/interface';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddtaskDialogComponent {


  get isFormInvalid() {
    return this.form.invalid;
  }

  get status() {
    return this.taskService.status;
  }

  private form;

  get controls() {
    return <any>this.form.controls;
  }
  get formValues() {
    return this.form.value;
  };

  constructor(private taskService: TasksService, private dialogRef: MatDialogRef<EditDialogComponent>) {
    const task: Itask = {
      _id: '',
      task_name: '',
      status: 0,
      description: ''
    }
    this.form = new FormGroup(this.getControls(task));
  }
  getControls(data: Itask) {
    let control: any = {}
    Object.keys(data).forEach((key) => {
      control[key] = new FormControl((<any>data)[key]);
    })
    return control;
  }

  submitForm() {
    this.dialogRef.close(this.formValues);
  }
}
