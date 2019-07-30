import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Router } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { UserActionTypes, CreateUser, CreateUserSuccess, Login, LoginSuccess, Logout, LogoutSuccess, UpdateUserSuccess, UpdateUser, CurrentUser, CurrentUserSuccess } from '../actions/user.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';


@Injectable()

export class UserEffects {

  constructor(public actions: Actions, public authService: AuthService, public userService: UserService,
    public store: Store<AppState>, public router: Router, public messageService: MessageService,) { }
  
  
  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap(payload => {
      console.log(payload)
      return this.authService.login(payload).pipe(
        map((isAuthenticated: boolean) => {
          let messages = [];
          this.router.navigate(['/']);
          messages.push('Logged in successfully');
          this.messageService.showSuccess(messages);
          return new LoginSuccess(isAuthenticated);
        }),
        catchError((error) => {
          console.log(error)
          let messages = this.messageService.parseError(error);
          this.messageService.showError(messages);
          return empty();
        })
      )
    })
  )

  @Effect()
  Logout: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGOUT),
    map((action: Logout) => action),
    switchMap(() => {
      return this.authService.logout().pipe(
        map(() => {
          let messages = [];
          this.router.navigate([`/login`]);
          messages.push('Loged out successfully');
          this.messageService.showSuccess(messages);
          return new LogoutSuccess();
        }),
        catchError((error) => {
          console.log(error);
          return empty();
        })
      );
    })
  )

  @Effect()
  CurrentUser: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.CURRENT),
    map((action: CurrentUser) => action),
    switchMap(() => {
      return this.authService.currentUser().pipe(
        map((user: User) => {
          return new CurrentUserSuccess(user)
        }),
        catchError((err) => {
          return empty()
        })
      )
    })
  )

  @Effect()
  Create: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.CREATE),
    map((action: CreateUser) => action.payload),
    switchMap(payload => {
      let  _user: User = payload;
      if (!_user.email) {
        let message = ['E-Mail is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.firstName) {
        let message = ['First name is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.lastName) {
        let message = ['Last name is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.password) {
        let message = ['Password is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.confirmPassword) {
        let message = ['Re-enter password is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(_user.password === _user.confirmPassword) {
        return this.userService.create(payload).pipe(
          map((user: User) => {
            let messages = [];
            messages.push('User successfully created');
            this.messageService.showSuccess(messages);
            this.router.navigate(['/login']);
            return new CreateUserSuccess(user);
          }),
          catchError((error) => {
            let messages = this.messageService.parseError(error);
            console.log(messages);
            if(messages[0].startsWith('E11000') ){
              let message = ['Email is already exists']
              this.messageService.showError(message);
              return empty();
            }
            this.messageService.showError(messages);
            return empty();
          })
        )
      } else {
        let message = ['Password and Re-enter password doesnot match'];
        this.messageService.showError(message)
        return empty();
      }

    })
  )

  @Effect()
  Update: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.UPDATE),
    map((action: UpdateUser) => action.payload),
    switchMap(payload => {
      let  _user: User = payload;
      if (!_user.email) {
        let message = ['E-Mail is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.firstName) {
        let message = ['First name is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.lastName) {
        let message = ['Last name is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.password) {
        let message = ['Password is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(!_user.confirmPassword) {
        let message = ['Re-enter password is Required'];
        this.messageService.showError(message)
        return empty();
      }
      if(_user.password === _user.confirmPassword) {
        return this.userService.update(payload).pipe(
          map((user: User) => {
            let messages = [];
            messages.push('Successfully updated');
            this.messageService.showSuccess(messages);
            return new UpdateUserSuccess(user)
          }),
          catchError((error) => {
            let messages = this.messageService.parseError(error);
            this.messageService.showError(messages);
            return empty(); 
          })
        )
      } else {
        let message = ['Password and Re-enter password doesnot match'];
        this.messageService.showError(message)
        return empty();
      }
    })
  )
}