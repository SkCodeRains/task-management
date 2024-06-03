import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements AfterViewInit {

  showElement: boolean;

  private _form = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]),
      confPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]),
    }
  );
  errorMessageEmail: any;
  errorMessagePass: any;
  errorMessageConfPass: any;
  errorMessageUsername: any;

  public get form() {
    return this._form;
  }

  public get controls() {
    return this._form.controls;
  }



  constructor(private rest: RestService, private router: Router, private service: TasksService) {
    this.showElement = true;
  }

  ngAfterViewInit(): void {

  }
  navigateToSignUp(event: Event) {
    event.preventDefault();
    this.showElement = false;
    setTimeout(() => {
      this.router.navigate(["/login"], { skipLocationChange: true })
    }, 300);
  }
  updateErrorMessage() {


    if (this.controls.username.hasError('required')) {
      this.errorMessageUsername = 'You must enter a value';
    } else if (this.controls.username.hasError("pattern")) {
      this.errorMessageUsername = 'Digits Not Allowed.';
    } else {
      this.errorMessageUsername = '';
    }


    if (this.controls.email.hasError('required')) {
      this.errorMessageEmail = 'You must enter a value';
    } else if (this.controls.email.hasError('email')) {
      this.errorMessageEmail = 'Not a valid email';
    } else {
      this.errorMessageEmail = '';
    }

    if (this.controls.password.hasError('required')) {
      this.errorMessagePass = 'You must enter a value';
    } else if (this.controls.password.hasError("pattern")) {
      this.errorMessagePass = 'Please Enter Valid Password.';
    } else {
      this.errorMessagePass = '';
    }


    if (this.controls.confPassword.hasError('required')) {
      this.errorMessageConfPass = 'You must enter a value';
    } else if (this.controls.confPassword.hasError('pattern')) {
      this.errorMessageConfPass = 'Please Enter Valid Confirm Password';
    } else if (this.controls.confPassword.value !== this.controls.password.value && this.controls.password.valid) {
      this.errorMessageConfPass = "Password Did Not Match";
      this.controls.confPassword.setErrors({ nomatch: true })
    } else {
      this.errorMessageConfPass = '';
    }

  }
  get isFormInvalid() {
    return this.form.invalid;

  }
  submitForm() {
    let subs = this.rest.signUp(this._form.value).subscribe({
      next: (res) => {
        this.service.user = res;
        this.router.navigate(["dashboard"], { skipLocationChange: true });
      },
      complete: () => {
        subs.unsubscribe();
      }
    })
  }

}
