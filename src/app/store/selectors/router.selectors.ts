import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../state/router.state';

export const selectRouter =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectCurrentUrl = createSelector(
  selectRouter,
  (router) => router.state?.url
);

export const selectRouteParams = createSelector(
  selectRouter,
  (router) => router.state?.params
);

export const selectQueryParams = createSelector(
  selectRouter,
  (router) => router.state?.queryParams
);
