import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewsState } from '../state/reviews.state';

export const selectReviewsState =
  createFeatureSelector<ReviewsState>('reviews');

export const selectReviews = createSelector(
  selectReviewsState,
  (state) => state.reviews
);

export const selectReviewsLoading = createSelector(
  selectReviewsState,
  (state) => state.loading
);

export const selectReviewsError = createSelector(
  selectReviewsState,
  (state) => state.error
);
