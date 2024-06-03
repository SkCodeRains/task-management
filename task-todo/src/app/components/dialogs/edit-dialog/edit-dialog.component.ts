import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from '../../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { Itask } from '../../interfaces/interface';
@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {

  errorMessageEmail: any;
  get isFormInvalid() {    
    return this.form.invalid || this.form.untouched
  }


  get status() {
    return this.taskService.status;
  }

  private form;

  get controls(): any {
    return this.form.controls;
  }
  get formValues() {
    return this.form.value;
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TasksService,
    private dialogRef: MatDialogRef<EditDialogComponent>) {
    this.form = new FormGroup(this.getControls(data));
  }
  getControls(data: Itask) {
    let control: any = {}
    Object.keys(data).forEach((key) => {
      control[key] = new FormControl((<any>data)[key]);
    })
    return control;
  }
  submitForm() { 
    this.dialogRef.close();
  }
}
