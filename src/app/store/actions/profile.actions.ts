import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/types';
import { Error } from '../../shared/models/error.model';

// Load Profile
export const loadProfile = createAction('[Profile] Load Profile');
export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ user: User }>()
);
export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: Error }>()
);

// Update Profile
export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ user: Partial<User> }>()
);
export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ user: User }>()
);
export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: Error }>()
);

// Update Profile Picture
export const updateProfilePicture = createAction(
  '[Profile] Update Profile Picture',
  props<{ pictureFile: File }>()
);
export const updateProfilePictureSuccess = createAction(
  '[Profile] Update Profile Picture Success',
  props<{ pictureUrl: string }>()
);
export const updateProfilePictureFailure = createAction(
  '[Profile] Update Profile Picture Failure',
  props<{ error: Error }>()
);

// Delete Profile Picture
export const deleteProfilePicture = createAction(
  '[Profile] Delete Profile Picture'
);
export const deleteProfilePictureSuccess = createAction(
  '[Profile] Delete Profile Picture Success'
);
export const deleteProfilePictureFailure = createAction(
  '[Profile] Delete Profile Picture Failure',
  props<{ error: Error }>()
);
