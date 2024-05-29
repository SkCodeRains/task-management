import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonService } from './services/rest.interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CommonService]
})
export class AppComponent {
  title = 'task';
  constructor(private router: Router) {
    this.router.navigate(["/dashboard"], { skipLocationChange: true })
  }
}
