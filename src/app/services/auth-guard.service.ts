import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {

  }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser()
       .pipe(
         map((response) => {
          if(response) {
            return true;
          }
         }),
         catchError(error => {
          this.router.navigate(['/login']);
          return of(false)
        })
       );
  }

}
