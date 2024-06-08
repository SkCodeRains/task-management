import { Injectable, signal } from '@angular/core';
import { CommonService } from './rest.interceptor.service';
import { IUser } from '../components/interfaces/interface';
import { ToastrService } from 'ngx-toastr';
import { NgxLoadingComponent } from 'ngx-loading';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  token = signal("");

  private _status = ["Off Track", "On Track", "Completed"];

  toastContainer!: ToastrService;


  private _loader!: import("ngx-loading").NgxLoadingComponent;
  private get loader(): import("ngx-loading").NgxLoadingComponent {
    return this._loader;
  }
  private set loader(value: import("ngx-loading").NgxLoadingComponent) {
    this._loader = value;
  }


  public get status() {
    return this._status;
  }

  constructor(private login: CommonService, private router: Router) {
    this.initZone();
  }

  setLoader(loader: NgxLoadingComponent) {
    this.loader = loader;
  }


  initZone() {
    this.token = this.login.token;
    this.login.event.pipe(takeUntilDestroyed()).subscribe({
      next: () => {
        this.token.set("");
        this.router.navigate(["login"], { skipLocationChange: true })
      }
    })
  }

  showLoader() {
    this.loader.show = true;
  }

  hideLoader() {
    this.loader.show = false;
  }

  private _user!: IUser;
  public get user(): IUser {
    return this._user;
  }

  public set user(response: { token?: string, user: IUser }) {
    this._user = response.user;
    if (response.token) {
      this.token.set(response.token)
    }
  }

}
