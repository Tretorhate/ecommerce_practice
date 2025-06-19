import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/types';
import { Error } from '../../shared/models/error.model';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: Error }>()
);

// Logout Actions
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: Error }>()
);

// Check Auth Status
export const checkAuth = createAction('[Auth] Check Auth Status');
export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Status Success',
  props<{ user: User }>()
);
export const checkAuthFailure = createAction(
  '[Auth] Check Auth Status Failure',
  props<{ error: Error }>()
);

// Load User Actions
export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: Error }>()
);
