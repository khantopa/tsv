import * as user from './reducers/user.reducer';

import { User } from '../models/user.model';

export interface AppState {
  userState: user.State;
}

export const reducers = {
  userState: user.reducer
}


// User Selectors

const getUser = (state: user.State): User => state.user;

export const selectUser = (state: AppState): User => getUser(state.userState);