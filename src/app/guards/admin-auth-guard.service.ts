import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService
  ) { }

  canActivate() {
    return this.auth.appUser$  
      .pipe(
        map(appUser => appUser.isAdmin)
      )
  }
} 
 