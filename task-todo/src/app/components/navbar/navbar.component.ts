import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog'; 
import { EditProfileDailogComponent } from '../dialogs/edit-profile-dailog/edit-profile-dailog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatMenuModule,MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  get profilePicture() {
    return this.taskService.user.profilePicture?.base64;
  }

  get username() {
    return this.taskService.user.username;
  }
  constructor(private taskService: TasksService, private router: Router, private dialog: MatDialog) {
    // this.gotoProfile()
  }

  logout() {
    this.taskService.token.set("");
    this.router.navigate(["/login"], { skipLocationChange: true })
  }

  gotoProfile(enterAnimationDuration = "200ms", exitAnimationDuration = "250ms") {
    // this.router.navigate(['/profile'], { skipLocationChange: true });
    this.dialog.open(EditProfileDailogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: "update-task",
      autoFocus: false
    })
  }

}
