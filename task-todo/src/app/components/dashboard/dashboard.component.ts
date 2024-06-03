import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from '../../services/rest.service';
import { TableComponent } from './table/table.component';
import { Itask } from '../interfaces/interface';

@Component({
  selector: '[#dashboard]',
  standalone: true,
  imports: [CommonModule, TableComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  tasks!: Array<Itask>;
  constructor(private rest: RestService) { }


  ngAfterViewInit(): void {
    this.fetchData();
  }


  fetchData() {
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
