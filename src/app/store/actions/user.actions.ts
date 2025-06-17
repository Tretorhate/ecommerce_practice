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
