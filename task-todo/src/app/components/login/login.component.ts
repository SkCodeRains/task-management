import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { TasksService } from '../../services/tasks.service';

const fadeAnimation: AnimationTriggerMetadata = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.3s ease-in-out', style({ opacity: 0 })),
  ]),
  state('void', style({ opacity: 0 })), // Define the void state for removed elements
]);

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  animations: [fadeAnimation],
})
export class LoginComponent {
  private _form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
    }
  );
  showElement: boolean;

  public get controls() {
    return this._form.controls;
  }

  public get form() {
    return this._form;
  }

  get isFormInvalid() {
    return this._form.invalid;
  }


  errorMessagePass: string = "Please Enter Valid Email Address";
  errorMessageEmail: string = "Please Enter Valid Password Followed By at least one digit and Uppercase Character.";

  constructor(protected rest: RestService, protected router: Router, private service: TasksService) {
    let subs = merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: this.updateErrorMessage.bind(this),
        complete: () => {
          subs.unsubscribe();
        }
      });
    this.showElement = true;
  }

  updateErrorMessage() {
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
      this.errorMessagePass = 'Please Enter Valid Password Followed By at least one digit and Uppercase Character.';
    } else {
      this.errorMessagePass = '';
    }
  }


  submitForm() {
    let subs = this.rest.login(this.form.value).subscribe({
      next: (res) => {
        this.service.user = res;
        this.router.navigate(["dashboard"], { skipLocationChange: true });
        this.service.token.set(res.token);
      },
      error: (error) => {
        console.log(error);
        if (error.error.message === "User Not Exists") {
          this.service.showMessage(error.error.message, 2000);
        }
      },
      complete: () => {
        subs.unsubscribe();
      }
    })
  }

  navigateToSignUp(event: Event) {
    event.preventDefault();
    this.showElement = false;
    setTimeout(() => {
      this.router.navigate(["signup"], { skipLocationChange: true })
    }, 300);
  }


}
