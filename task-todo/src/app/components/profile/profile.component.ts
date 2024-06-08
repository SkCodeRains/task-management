import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RestService } from '../../services/rest.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IUser } from '../interfaces/interface';
import { EditProfileDailogComponent } from '../dialogs/edit-profile-dailog/edit-profile-dailog.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class ProfileComponent {

  errorMessageUsername: any;
  selectedFile!: String | undefined;
  get disabled() {
    return this.form.disabled;
  }
  set disabled(value: boolean) {
    value ? this.form.disable() : this.form.enable();
  }


  get user(): IUser {
    return this.taskService.user;
  }

  form;
  get controls() {
    return this.form.controls;
  }

  get isInvalid() {
    return this.form.invalid;
  }
  file!: File
  constructor(private taskService: TasksService, private rest: RestService, private dialog: MatDialogRef<EditProfileDailogComponent>) {
    this.form = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required, Validators.pattern('^[A-Za-z]+ [A-Za-z\s]*$')]),
      dob: new FormControl(this.user.dob || ""),
      picture: new FormControl(this.file),
      gender: new FormControl(this.user.gender || ""),
      address: new FormControl(this.user.address || ""),
    })
    this.selectedFile = taskService.user?.profilePicture?.base64;
    this.form.disable();
  }
  updateErrorMessage() {
    throw new Error('Method not implemented.');
  }
  mapFormToFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        if (control.value) {
          if (control.value instanceof Date) {
            formData.append(key, control.value.toISOString());
          } else if (control.value instanceof File) {
            formData.append(key, control.value, control.value.name);
          } else {
            formData.append(key, control.value|| " ");
          }
        }
      }
    });
    return formData;
  }



  updateProfile(e: Event) {
    e.preventDefault();
    if (this.isInvalid) {
      return
    }
    const formData = this.mapFormToFormData();
    let subs = this.rest.updateProfile(formData).subscribe({
      next: this.profileUpdateResponse.bind(this),
      complete: () => { subs.unsubscribe(); }
    });
  }


  profileUpdateResponse(res: any) {
    if (res.success) {
      this.taskService.user = res;
      this.dialog.close();
    }
  }


  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.form.markAsTouched();
    if (fileInput.files) {
      if (fileInput.files.length > 0) {
        let selectedFile = fileInput.files[0];
        this.controls.picture.setValue(selectedFile);
        if (selectedFile && selectedFile.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedFile = e.target!.result as string;
          };
          reader.readAsDataURL(selectedFile);
        } else {
          // Handle non-image files (e.g., display a message)
          this.selectedFile = '';
          console.warn('Only image files are allowed.');
        }
      }
    }
  }

}
