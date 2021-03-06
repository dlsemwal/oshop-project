import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>


  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl)
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())

  }


  logout() {
    this.afAuth.auth.signOut()
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(
          user => {
            if (user) return this.userService.get(user.uid)
            else return of(null)
          }
        )
      )
  }
}
