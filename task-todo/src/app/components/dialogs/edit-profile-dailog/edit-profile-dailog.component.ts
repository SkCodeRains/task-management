import { Component } from '@angular/core';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-edit-profile-dailog',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './edit-profile-dailog.component.html',
  styleUrl: './edit-profile-dailog.component.scss'
})
export class EditProfileDailogComponent {
  constructor() {

  }
}
