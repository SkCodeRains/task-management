import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksService } from './services/tasks.service';
import { ToastContainerDirective, ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxLoadingComponent, NgxLoadingModule } from 'ngx-loading';


@Component({
  selector: '[#root]',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    NgxLoadingModule,
    ToastrModule,
    ToastContainerDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'task';

  @ViewChild(ToastContainerDirective, { static: true })
  public set toastContainer(value: ToastContainerDirective) {
    if (value) {
      this.toaster.overlayContainer = value;
      this.taskService.toastContainer = this.toaster;
    }
  }

  @ViewChild(NgxLoadingComponent, { static: true })
  public set loader(value: NgxLoadingComponent) {
    this.taskService.setLoader(value);
  }




  constructor(private taskService: TasksService, private toaster: ToastrService) { }

  get showNavbar() {
    return this.taskService.token().length > 0;
  }
}
