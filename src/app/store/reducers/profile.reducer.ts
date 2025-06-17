import { createReducer, on } from '@ngrx/store';
import { ProfileState } from '../state/profile.state';
import * as UserActions from '../actions/user.actions';

export const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const profileReducer = createReducer(
  initialState,
  // Load profile
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      orders: [],
      reviews: [],
    },
    loading: false,
    error: null,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear profile on Logout
  on(UserActions.logoutSuccess, () => initialState)
);
