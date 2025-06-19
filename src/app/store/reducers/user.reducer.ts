import { createReducer, on } from '@ngrx/store';
import { UserState } from '../state/user.state';
import * as UserActions from '../actions/user.actions';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // Login
  on(UserActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Logout
  on(UserActions.logout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.logoutSuccess, () => ({
    ...initialState,
  })),
  on(UserActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load User
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
