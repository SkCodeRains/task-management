import { Injectable, signal } from '@angular/core';
import { CommonService } from './rest.interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  token = signal("");

  private _status = ["Off Track", "On Track", "Completed"];
  public get status() {
    return this._status;
  }

  constructor(private login: CommonService, private snackBar: MatSnackBar) {
    this.initZone();
  }



  initZone() {
    this.token = this.login.token;
    this.token.set("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1vaGFtbWVkIFNoYWlraCIsImVtYWlsIjoic2tjb2RlcmFpbnMxQGdtYWlsLmNvbSIsImlkIjoiNjY1Njk4ZjIyNjUwOWFjNDE5MGZiZjE0IiwiaWF0IjoxNzE2OTUxMjgyfQ.B3a5MRhntMDSW-IaogKCoKTO9KorjZI6WNyk-ZBnUGM")
    let subs = this.login.event.subscribe({
      next: () => {
        this.token.set("");
      },
      complete: () => {
        subs.unsubscribe();
      }
    })
  }

  private _user: any;
  public get user(): any {
    return this._user;
  }
  public set user(value: any) {
    this._user = value;
  }
  showMessage(message: any, duration = 1000) {
    this.snackBar.open(message, 'Warning', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: duration
    });
  }

}
