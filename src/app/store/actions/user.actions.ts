import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum UserActionTypes {
  LOGIN = '[User] Login',
  LOGIN_SUCCESS = '[User] Login Success',
  CURRENT = '[User] Current',
  CURRENT_SUCCESS = '[User] Current Success',
  CREATE = '[User] Create',
  CREATE_SUCCESS = '[User] Create Success',
  UPDATE = '[User] Update',
  UPDATE_SUCCESS = '[User] Update Success',
  LOGOUT = '[User] Logout',
  LOGOUT_SUCCESS = '[User] Logout Success',
}


export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public  payload: boolean ) {}
}

export class Logout implements Action {
  readonly type = UserActionTypes.LOGOUT;
  constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = UserActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}

export class CreateUser implements Action {
  readonly type = UserActionTypes.CREATE;
  constructor(public payload: User) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UserActionTypes.CREATE_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_SUCCESS;
  constructor(public payload: User) {}
}

export class CurrentUser implements Action {
  readonly type = UserActionTypes.CURRENT;
  constructor() {}
}

export class CurrentUserSuccess implements Action {
  readonly type = UserActionTypes.CURRENT_SUCCESS;
  constructor(public payload: User) {}
}  




export type All = Login | LoginSuccess | Logout | LogoutSuccess | CreateUser | CreateUserSuccess  | UpdateUser 
| UpdateUserSuccess | CurrentUser | CurrentUserSuccess;