import { User } from 'src/app/models/user.model';
import { All, UserActionTypes } from '../actions/user.actions';

export interface State {
  user: any;
  users: User[];
  isAuthenticated: boolean;
  failedReason: any;
  total: number;
}

export const initialState: State = {
  user: null,
  users: [],
  failedReason: '',
  isAuthenticated: false,
  total: 0,
 
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state
      };
    }
    case UserActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
      }
    }
    case UserActionTypes.CREATE: {
      return {
        ...state
      }
    }
    case UserActionTypes.CREATE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        users: [...state.users, action.payload],
        total: state.total + 1
      }
    }
    case UserActionTypes.CURRENT: {
      return {
        ...state
      }
    }
    case UserActionTypes.CURRENT_SUCCESS: {
      return {
        ...state,
        user: action.payload
      }
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state
      }
    }
    case UserActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      }
    }   
    case UserActionTypes.UPDATE: {
      return {
        ...state
      };
    }
    case UserActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        users: state.users.map(
          user => {
            if(user.email === action.payload.email) {
              return action.payload;
            }
            return user
          }
        )
      };
    }
    default: {
      return {
        ...state
      }
    }
  }
}