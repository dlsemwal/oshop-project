import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    auth.user$.subscribe(
      user => {
        if (user) {
          userService.save(user);
          let returnUrl = localStorage.getItem('returnUrl');
          router.navigate([returnUrl])
        }
      }
    )
  }
}
