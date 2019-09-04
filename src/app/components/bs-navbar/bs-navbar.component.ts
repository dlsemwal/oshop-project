import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: AppUser;

  constructor(
    public auth: AuthService
  ) {
    auth.appUser$.subscribe(appUser => this.user = appUser)
  }

  logout() {
    this.auth.logout()
  }
}
