import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TasksService } from '../../../services/tasks.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatRadioModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddtaskDialogComponent {


  errorMessageTaskName = 'You must enter a value';
  get isFormInvalid() {
    return this.form.invalid;
  }

  get status() {
    return this.taskService.status;
  }

  private form;

  get controls() {
    return this.form.controls;
  }
  get formValues() {
    return this.form.value;
  };

  constructor(private taskService: TasksService, private dialogRef: MatDialogRef<EditDialogComponent>) {
    this.form = new FormGroup({
      task_name: new FormControl("", [Validators.required]),
      status: new FormControl(0)
    });
  }

 
  submitForm() {
    this.dialogRef.close(this.formValues);
  }
}
