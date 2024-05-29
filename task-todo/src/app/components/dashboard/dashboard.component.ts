import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from '../../services/rest.service';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Itask } from '../interfaces/interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  tasks!: Array<Itask>;
  constructor(private rest: RestService) { }


  ngAfterViewInit(): void {
    this.request();
  }
  request() {
    let subs = this.rest.getTasks().subscribe({
      next: (res) => {
        if (res.success) {
          this.tasks = res.tasks;          
        }
      },
      complete: () => { 
        subs.unsubscribe();        
      }
    });
  }


}
